import { Injectable } from '@nestjs/common';
import { ImageConsumerService } from 'src/modules/image-consumer/image-consumer.service';

@Injectable()
export class ImageCompressorService {
  constructor(private imageConsumerService: ImageConsumerService) {}

  public async run() {
    while (true) {
      try {
        await this.imageConsumerService.process();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
