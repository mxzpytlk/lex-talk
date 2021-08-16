export enum MessageType {
  FILE = 'FILE',
  TEXT = 'TEXT',
}

export interface IMessage {
  text?: string;
  file?: string;
  dateTime: Date;
  type: MessageType;
}

export interface IMessageGQL {
  text?: string;
  file?: string;
  dateTime: string;
}

export class MessageData implements IMessage {
  constructor(private message: IMessageGQL) {}

  public get text(): string | undefined {
    return this.message.text;
  }

  public get file(): string | undefined {
    return this.message.file;
  }

  public get dateTime(): Date {
    return new Date(this.message.dateTime);
  }

  public get type(): MessageType {
    if (this.text) {
      return MessageType.TEXT;
    }
    if (this.file) {
      return MessageType.FILE;
    }
  }
}
