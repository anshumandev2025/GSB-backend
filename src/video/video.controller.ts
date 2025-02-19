import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDTO, UpdateVideoDTO } from './dto/video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async createVideo(@Body() createVideoDTO: CreateVideoDTO) {
    return this.videoService.createVideo(createVideoDTO);
  }

  @Put()
  async updateVideo(@Body() updateVideoDTO: UpdateVideoDTO) {
    return this.videoService.updateVideo(updateVideoDTO);
  }

  @Get()
  async getAllVideos() {
    return this.videoService.getAllVideos();
  }

  @Delete(':id')
  async deleteVide(@Param() params: any) {
    return this.videoService.deleteVideo(params.id);
  }
}
