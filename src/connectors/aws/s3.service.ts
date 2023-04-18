import { GetObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { EnvironmentTypes } from 'src/connectors/config/types/environmentTypes';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private client: S3Client;
  private readonly bucketName: string;
  private readonly nodeEnv: string;

  constructor(configConnectorService: ConfigConnectorService) {
    const { S3_REGION, S3_NAME } = configConnectorService.getS3Config();
    const { SECRET_ACCESS_KEY, ACCESS_KEY_ID } = configConnectorService.getAwsConfig();
    const { NODE_ENV } = configConnectorService.getAppConfig();

    this.bucketName = S3_NAME;

    const config: S3ClientConfig = {
      region: S3_REGION,
      forcePathStyle: false,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
      }
    };

    if (NODE_ENV === EnvironmentTypes.local) {
      config.endpoint = 'http://localhost:4566';
      config.forcePathStyle = true;
    }
    this.nodeEnv = NODE_ENV;
    this.client = new S3Client(config);
  }

  public getFileUrl(key: string): string {
    if (this.nodeEnv === EnvironmentTypes.local) {
      return `http://localhost:4566/${this.bucketName}/${key}`;
    }

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  public async uploadFile(key: string, body: string | Uint8Array | Buffer): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body
    });

    await this.client.send(command);
  }

  public async getFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key
    });

    const { Body } = await this.client.send(command);
    const body = Body as Readable;
    const arrayBuffer: Buffer[] = [];

    for await (const data of body) {
      arrayBuffer.push(Buffer.from(data));
    }

    return Buffer.concat(arrayBuffer);
  }
}
