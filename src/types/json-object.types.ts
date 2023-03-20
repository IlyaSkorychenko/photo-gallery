export type JsonValue =
  | string
  | number
  | boolean
  | { [key: string]: JsonValue }
  | JsonValue[];

export type JsonObject = Record<string, JsonValue>;
