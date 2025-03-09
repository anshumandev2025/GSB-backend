import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schema/video.schema';
import { Model } from 'mongoose';
import { CreateVideoDTO, UpdateVideoDTO } from './dto/video.dto';
import { S3Service } from 'src/common/s3.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private readonly s3Service: S3Service,
  ) {}

  async createVideo(createVideoDTO: CreateVideoDTO, file: Express.Multer.File) {
    let res: any;
    if (file) {
      const videoUrl = await this.s3Service.uploadFile(file);
      console.log('video url');
      const video = new this.videoModel({
        ...createVideoDTO,
        video_url: videoUrl.url,
      });
      await video.save();
      res = video;
    } else {
      console.log('crate vifeo dto-->', createVideoDTO);
      const video = new this.videoModel({ ...createVideoDTO });
      await video.save();
      res = video;
    }
    return res;
  }

  async updateVideo(updateVideoDTO: UpdateVideoDTO) {
    const video = await this.videoModel.findByIdAndUpdate(
      updateVideoDTO.id,
      { ...updateVideoDTO },
      { new: true },
    );
    if (!video) {
      throw new Error('Video not found');
    }
    return video;
  }

  async getAllVideos(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    category: string = '',
  ) {
    const skip = (page - 1) * limit;
    const queryFilters: any = {};
    if (search) {
      queryFilters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) {
      queryFilters.category = category.toLowerCase();
    }
    const videos = await this.videoModel
      .find(queryFilters)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.videoModel.countDocuments(queryFilters);
    return { data: videos, total };
  }

  async deleteVideo(id: string) {
    const video = await this.videoModel.findByIdAndDelete(id);
    if (video?.type == 'youtube') {
      //@ts-ignore
      const key = new URL(video?.video_url).pathname.substring(1);
      await this.s3Service.deleteFile(key);
    }
    if (!video) {
      throw new Error('Video not found');
    }

    return { message: 'Video deleted successfully' };
  }
}
