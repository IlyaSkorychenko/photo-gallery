export interface IAttributes<T> {
  [k: string]: {
    value: T;
    makeStringValue?: (value: T) => string;
  };
}

export interface ISendMessageParams<T> {
  attributes: IAttributes<T>;
  messageBody: string;
  queueName: string;
}

export interface IReceiveMessagesResult<T = Record<string, string>> {
  attributes: T;
  handler: string;
}

export type TMessageDataType = 'String' | 'Number';
