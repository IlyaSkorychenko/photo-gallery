import { BadRequestException, Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ValidateResponseInterceptor } from 'src/controllers/common/interseptors/ValidateResponseInterceptor';
import { convertNumericResolutionEnum } from 'src/controllers/image-grpc-controller/helper';
import { CreateCompressedImage } from 'src/controllers/image-grpc-controller/response-validator-dtos/create-compressed-image.response-validator-dto';
import { CreateCompressedImageData } from 'src/controllers/image-grpc-controller/types/create-compressed-image-data.types';
import { ImageService } from 'src/modules/image/image.service';

@Controller()
export class ImageGrpcController {
  constructor(private readonly imageService: ImageService) {}

  @GrpcMethod('ImageService')
  @UseInterceptors(new ValidateResponseInterceptor(CreateCompressedImage))
  async createCompressedImage(data: CreateCompressedImageData): Promise<CreateCompressedImage> {
    const enumResolutionType = convertNumericResolutionEnum(data.type);

    if (!enumResolutionType) {
      throw new BadRequestException();
    }

    const createdId = await this.imageService.createCompressedImage(data.originalId, enumResolutionType);

    return {
      id: createdId
    };
  }
}
