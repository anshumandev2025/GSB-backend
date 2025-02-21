import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [CommonService, S3Service],
  exports: [S3Service],
})
export class CommonModule {}
