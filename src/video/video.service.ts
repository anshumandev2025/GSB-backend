import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schema/video.schema';
import { Model } from 'mongoose';
import { CreateVideoDTO, UpdateVideoDTO } from './dto/video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async createVideo(createVideoDTO: CreateVideoDTO): Promise<Video> {
    const video = new this.videoModel({ ...createVideoDTO });
    return video.save();
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

  async getAllVideos(): Promise<Video[]> {
    return this.videoModel.find();
  }

  async deleteVideo(id: string) {
    const video = await this.videoModel.findByIdAndDelete(id);
    if (!video) {
      throw new Error('Video not found');
    }

    return { message: 'Video deleted successfully' };
  }
}
