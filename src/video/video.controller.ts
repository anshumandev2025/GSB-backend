import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDTO, UpdateVideoDTO } from './dto/video.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  async createVideo(
    @UploadedFile() video: Express.Multer.File,
    @Body() createVideoDTO: CreateVideoDTO,
  ) {
    return this.videoService.createVideo(createVideoDTO, video);
  }

  @Put()
  @UseInterceptors(FileInterceptor('video'))
  async updateVideo(
    @UploadedFile() video: Express.Multer.File,
    @Body() updateVideoDTO: UpdateVideoDTO,
  ) {
    return this.videoService.updateVideo(updateVideoDTO);
  }

  @Get()
  async getAllVideos(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.videoService.getAllVideos(page, limit, search);
  }

  @Delete(':id')
  async deleteVide(@Param() params: any) {
    return this.videoService.deleteVideo(params.id);
  }
}
