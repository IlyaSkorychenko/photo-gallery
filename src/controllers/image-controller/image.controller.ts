import { Controller, Get, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateResponseInterceptor } from 'src/controllers/common/interseptors/ValidateResponseInterceptor';
import { GetAllResponseValidatorDto } from 'src/controllers/image-controller/response-validator-dtos/get-all.response-validator-dto';
import { ImageFileValidator } from 'src/controllers/image-controller/validators/image-file.validator';
import { ImageService } from 'src/modules/image/image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  upload(
    @UploadedFile(new ParseFilePipe({ validators: [new ImageFileValidator()] }))
    file: Express.Multer.File
  ) {
    console.log(file.buffer);
  }

  @Get('/')
  @UseInterceptors(new ValidateResponseInterceptor(GetAllResponseValidatorDto))
  async getAll() {
    const userId = '';

    return this.imageService.getAll(userId);
  }
}
