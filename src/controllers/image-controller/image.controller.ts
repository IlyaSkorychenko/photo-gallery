import { Controller, Get, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateResponseInterceptor } from 'src/controllers/common/interseptors/ValidateResponseInterceptor';
import { CreateResponseValidatorDto } from 'src/controllers/image-controller/response-validator-dtos/create.response-validator-dto';
import { GetAllResponseValidatorDto } from 'src/controllers/image-controller/response-validator-dtos/get-all.response-validator-dto';
import { ImageFileValidator } from 'src/controllers/image-controller/validators/image-file.validator';
import { ImageProducerService } from 'src/modules/image-producer/image-producer.service';
import { ImageService } from 'src/modules/image/image.service';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly imageProducerService: ImageProducerService
  ) {}

  @Post('upload')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(new ValidateResponseInterceptor(CreateResponseValidatorDto))
  async upload(
    @UploadedFile(new ParseFilePipe({ validators: [new ImageFileValidator()] }))
    file: Express.Multer.File
    // @GetJwtUser() user: IJwtUser
  ) {
    const userId = 'bf3ca3f6-7209-46e2-9e19-9749b7cd3401';
    // const userId = user.sub;
    const nameData = file.originalname.split('.');

    const newImageId = await this.imageProducerService.processNewImage({
      userId,
      bufferData: file.buffer,
      format: nameData.pop(),
      name: nameData.join('.')
    });

    return {
      id: newImageId
    };
  }

  @Get('/')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new ValidateResponseInterceptor(GetAllResponseValidatorDto))
  async getAll(/*@GetJwtUser() user: IJwtUser*/) {
    // const userId = user.sub;
    const userId = 'bf3ca3f6-7209-46e2-9e19-9749b7cd3401';

    return this.imageService.getAll(userId);
  }
}
