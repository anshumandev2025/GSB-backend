import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    console.log('config service');
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET', '');

    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
      '',
    );

    if (!accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS credentials are missing! Check your environment variables.',
      );
    }

    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  /**
   * Uploads a file to S3
   * @param file The file to upload
   * @param folder Optional folder path within the bucket
   * @param customFilename Optional custom filename (defaults to generated UUID)
   * @returns The URL of the uploaded file
   */
  async uploadFile(
    file: Buffer | Express.Multer.File,
    folder: string = 'uploads',
    customFilename?: string,
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Handle both Buffer and Multer File types
    const fileBuffer = Buffer.isBuffer(file) ? file : file.buffer;
    const originalName = Buffer.isBuffer(file)
      ? customFilename || 'file'
      : file.originalname;

    // Generate filename with UUID to avoid conflicts
    const fileExtension = originalName.split('.').pop();
    const filename = customFilename || `${uuidv4()}.${fileExtension}`;
    const key = `${folder}/${filename}`;

    // Determine MIME type dynamically
    const contentType = this.getContentType(originalName);

    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
      ACL: 'public-read' as ObjectCannedACL, // ✅ Fix ACL type issue
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      const url = `https://${this.bucket}.s3.amazonaws.com/${key}`;
      return { url, key };
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload file to S3: ${error.message}`,
      );
    }
  }

  /**
   * Deletes a file from S3
   * @param key The S3 key of the file to delete
   * @returns Success status
   */
  async deleteFile(
    key: string,
  ): Promise<{ success: boolean; message: string }> {
    if (!key) {
      throw new BadRequestException('File key is required');
    }

    const params = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      // Check if file exists before attempting deletion
      await this.s3Client.send(new HeadObjectCommand(params));

      // Delete the file
      await this.s3Client.send(new DeleteObjectCommand(params));
      return {
        success: true,
        message: `File ${key} successfully deleted from S3`,
      };
    } catch (error) {
      if (error.name === 'NotFound') {
        throw new BadRequestException(`File not found: ${key}`);
      }
      throw new BadRequestException(
        `Failed to delete file from S3: ${error.message}`,
      );
    }
  }

  /**
   * Updates a file on S3 (delete and re-upload)
   * @param key The S3 key of the file to update
   * @param newFile The new file content
   * @returns The URL of the updated file
   */
  async updateFile(
    key: string,
    newFile: Buffer | Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    if (!key || !newFile) {
      throw new BadRequestException(
        'File key and new file content are required',
      );
    }

    try {
      // First check if the file exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      // Extract folder and filename from key
      const keyParts = key.split('/');
      const filename = keyParts.pop();
      const folder = keyParts.join('/');

      // Upload new file with same key
      return await this.uploadFile(newFile, folder, filename);
    } catch (error) {
      if (error.name === 'NotFound') {
        throw new BadRequestException(`File not found: ${key}`);
      }
      throw new BadRequestException(
        `Failed to update file on S3: ${error.message}`,
      );
    }
  }

  /**
   * Determines the MIME type based on file extension
   * @param filename The filename to analyze
   * @returns The detected MIME type or application/octet-stream as fallback
   */
  private getContentType(filename: string): string {
    // Use mime-types package to detect content type
    const contentType = mime.lookup(filename);
    // Return detected type or default to binary stream if type cannot be determined
    return contentType || 'application/octet-stream';
  }

  /**
   * Checks if a file exists in S3
   * @param key The S3 key to check
   * @returns Boolean indicating if file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw new BadRequestException(
        `Error checking if file exists: ${error.message}`,
      );
    }
  }
}
