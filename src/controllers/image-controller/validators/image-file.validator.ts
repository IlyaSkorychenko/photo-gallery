import { FileValidator, Injectable } from '@nestjs/common';

@Injectable()
export class ImageFileValidator extends FileValidator {
  private readonly maxSizeInBytes = 4 * 1048576;
  private readonly allowedTypes = ['image/jpeg', 'image/png'];

  constructor() {
    super({});
  }

  buildErrorMessage(): string {
    const formattedAllowTypes = this.allowedTypes.join(' or ').replace(/image\//g, '');

    return `File shod be les then ${this.maxSizeInBytes} bytes and has type ${formattedAllowTypes}`;
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return file.size < this.maxSizeInBytes && this.allowedTypes.includes(file.mimetype);
  }
}
