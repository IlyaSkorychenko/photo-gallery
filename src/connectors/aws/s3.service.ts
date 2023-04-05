import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';

@Injectable()
export class S3Service {
  private client: S3Client;
  private readonly bucketName: string;

  constructor(configConnectorService: ConfigConnectorService) {
    const { S3_REGION, S3_NAME } = configConnectorService.getS3Config();
    // const { SECRET_ACCESS_KEY, ACCESS_KEY_ID } = configConnectorService.getAwsConfig();

    this.bucketName = S3_NAME;
    this.client = new S3Client({
      region: S3_REGION
      // credentials: {
      //   accessKeyId: ACCESS_KEY_ID,
      //   secretAccessKey: SECRET_ACCESS_KEY
      // }
    });
  }

  public getFileUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  public async uploadFile(key: string, body: string | Uint8Array | Buffer) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body
    });

    return this.client.send(command);
  }
}
