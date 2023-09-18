import { Injectable } from '@nestjs/common';
import { resize } from 'imagemagick';
import { S3Service } from 'src/connectors/aws/s3.service';
import { SqsService } from 'src/connectors/aws/sqs.service';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { IMessage } from 'src/modules/common/types/image-sqs.types';
import { IUploadResizedImageParams } from 'src/modules/image-consumer/types/image-consumer-service.types';
import { ImageRepoService } from 'src/repos/image-repo/image-repo.service';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

@Injectable()
export class ImageConsumerService {
  private readonly queueName: string;

  constructor(
    private sqsService: SqsService,
    private s3Service: S3Service,
    private imageRepoService: ImageRepoService,
    configConnectorService: ConfigConnectorService
  ) {
    const { IMAGE_QUEUE_NAME } = configConnectorService.getSqsConfig();
    this.queueName = IMAGE_QUEUE_NAME;
  }

  private resizeAsync(srcData: string, srcFormat: string, height: number, width: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      resize(
        {
          srcData,
          srcFormat,
          width,
          height
        },
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(Buffer.from(result, 'binary'));
        }
      );
    });
  }

  private getResizedHeightAndWidth(height: number, width: number, resolution: ResolutionEnum) {
    let resolutionDevider = 1;

    switch (resolution) {
      case ResolutionEnum.low: {
        resolutionDevider = 2;

        break;
      }

      case ResolutionEnum.medium: {
        resolutionDevider = 1.25;

        break;
      }

      case ResolutionEnum.high: {
        resolutionDevider = 1.05;

        break;
      }
    }

    return {
      height: Math.round(width / resolutionDevider),
      width: Math.round(height / resolutionDevider)
    };
  }

  private async uploadResizedImage({
    originalHeight,
    originalWidth,
    originalId,
    format,
    resolution
  }: IUploadResizedImageParams) {
    const originalImage = await this.s3Service.getFile(`${originalId}.${format}`);
    const { height, width } = this.getResizedHeightAndWidth(originalHeight, originalWidth, resolution);
    const resizedImage = await this.resizeAsync(originalImage.toString('binary'), format, height, width);
    const compressedImage = await this.imageRepoService.createCompressedImage({
      imageId: originalId,
      resolution
    });
    await this.s3Service.uploadFile(`${compressedImage.id}.${format}`, resizedImage);
  }

  public async process() {
    const message = await this.sqsService.receiveMessage<IMessage>(1, this.queueName);

    if (!message) {
      return;
    }

    try {
      const image = await this.imageRepoService.findById(message.attributes.id);
      await this.uploadResizedImage({
        originalId: image.id,
        originalHeight: image.height,
        originalWidth: image.width,
        format: message.attributes.format,
        resolution: message.attributes.resolution
      });
    } catch (e) {
      console.log(e);
    }
    await this.sqsService.deleteMessage(message.handler, this.queueName);
  }
}
