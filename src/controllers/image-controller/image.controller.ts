import { Controller, Get, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetJwtUser } from 'src/controllers/common/decorators/get-user.decorator';
import { ValidateResponseInterceptor } from 'src/controllers/common/interseptors/ValidateResponseInterceptor';
import { GetAllResponseValidatorDto } from 'src/controllers/image-controller/response-validator-dtos/get-all.response-validator-dto';
import { ImageFileValidator } from 'src/controllers/image-controller/validators/image-file.validator';
import { IJwtUser } from 'src/modules/auth/types/jwt-strategy.types';
import { ImageProducerService } from 'src/modules/image-producer/image-producer.service';
import { ImageService } from 'src/modules/image/image.service';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly imageProducerService: ImageProducerService
  ) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile(new ParseFilePipe({ validators: [new ImageFileValidator()] }))
    file: Express.Multer.File,
    @GetJwtUser() user: IJwtUser
  ) {
    const userId = user.sub;
    const nameData = file.originalname.split('.');

    await this.imageProducerService.processNewImage({
      userId,
      bufferData: file.buffer,
      format: nameData.pop(),
      name: nameData.join('.')
    });
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new ValidateResponseInterceptor(GetAllResponseValidatorDto))
  async getAll(@GetJwtUser() user: IJwtUser) {
    const userId = user.sub;

    return this.imageService.getAll(userId);
  }
}
