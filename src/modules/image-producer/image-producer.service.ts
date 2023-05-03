import { Injectable } from '@nestjs/common';
import { SqsService } from 'src/connectors/aws/sqs.service';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { ImageService } from 'src/modules/image/image.service';
import { ICreateParams } from 'src/modules/image/types/image-service-params.types';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

@Injectable()
export class ImageProducerService {
  constructor(
    private imageService: ImageService,
    private sqsService: SqsService,
    private configConnectorService: ConfigConnectorService
  ) {}

  private async sendMessages(imageId: string) {
    const { IMAGE_QUEUE_NAME } = this.configConnectorService.getSqsConfig();

    await Promise.all([
      Object.values(ResolutionEnum).map((resolution) =>
        this.sqsService.sendMessage({
          queueName: IMAGE_QUEUE_NAME,
          attributes: {
            id: {
              value: imageId
            },
            resolution: {
              value: resolution
            }
          },
          messageBody: 'Image data'
        })
      )
    ]);
  }

  public async processNewImage(createParams: ICreateParams): Promise<string> {
    const newImageId = await this.imageService.create(createParams);
    await this.sendMessages(newImageId);

    return newImageId;
  }
}
