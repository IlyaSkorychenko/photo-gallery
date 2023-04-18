import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQS,
  SQSClientConfig
} from '@aws-sdk/client-sqs';
import { MessageAttributeValue } from '@aws-sdk/client-sqs/dist-types/models/models_0';
import { Injectable } from '@nestjs/common';
import {
  IAttributes,
  IReceiveMessagesResult,
  ISendMessageParams,
  TMessageDataType
} from 'src/connectors/aws/types/sqs-service.types';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { EnvironmentTypes } from 'src/connectors/config/types/environmentTypes';

@Injectable()
export class SqsService {
  private client: SQS;
  private readonly queueUrl: string;

  constructor(configConnectorService: ConfigConnectorService) {
    const { SQS_REGION, SQS_SECRET_ACCESS_KEY, SQS_ACCESS_KEY_ID, SQS_URL } = configConnectorService.getSqsConfig();
    const { NODE_ENV } = configConnectorService.getAppConfig();

    const config: SQSClientConfig = {
      region: SQS_REGION,
      credentials: {
        accessKeyId: SQS_ACCESS_KEY_ID,
        secretAccessKey: SQS_SECRET_ACCESS_KEY
      }
    };

    if (NODE_ENV === EnvironmentTypes.local) {
      config.endpoint = 'http://localhost:4566';
      config.credentials = undefined;
    }

    this.queueUrl = SQS_URL;
    this.client = new SQS(config);
  }

  private makeSqsAttributes<T>(attributes: IAttributes<T>) {
    return Object.entries(attributes).reduce<Record<string, MessageAttributeValue>>(
      (accumulator, [name, { value, makeStringValue }]) => {
        const dataType: TMessageDataType = typeof value === 'number' ? 'Number' : 'String';
        const stringValue = makeStringValue ? makeStringValue(value) : value.toString();

        accumulator[name] = {
          DataType: dataType,
          StringValue: stringValue
        };

        return accumulator;
      },
      {}
    );
  }

  public async sendMessage<T>({ attributes, messageBody, queueName }: ISendMessageParams<T>): Promise<string> {
    const messageAttributes = this.makeSqsAttributes(attributes);
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl + queueName,
      MessageAttributes: messageAttributes,
      MessageBody: messageBody
    });
    const { MessageId: messageId } = await this.client.send(command);

    return messageId;
  }

  public async receiveMessage<T>(
    visibilityTimoutInSeconds: number,
    queueName: string
  ): Promise<IReceiveMessagesResult<T> | null> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl + queueName,
      VisibilityTimeout: visibilityTimoutInSeconds,
      MessageAttributeNames: ['All']
    });
    const { Messages: messages } = await this.client.send(command);

    if (!messages) {
      return null;
    }

    const [message] = messages;
    const { MessageAttributes: attributes, ReceiptHandle: handler } = message;

    const attributeEntries = Object.entries(attributes).map(([key, attributeValue]) => [
      key,
      attributeValue.StringValue
    ]);

    return {
      handler,
      attributes: Object.fromEntries(attributeEntries)
    };
  }

  public async deleteMessage(receiptHandle: string, queueName: string): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl + queueName,
      ReceiptHandle: receiptHandle
    });

    await this.client.send(command);
  }
}
