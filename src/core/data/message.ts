export enum MessageType {
  FILE = 'FILE',
  TEXT = 'TEXT',
}

export interface IMessage {
  text?: string;
  file?: string;
  dateTime: Date;
  type: MessageType;
  sender: string;
}

export interface IMessageGQL {
  text?: string;
  file?: string;
  dateTime: string;
  sender: string;
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

  public get sender(): string {
    return this.message.sender;
  }

  public get type(): MessageType {
    if (this.text || this.text === '') {
      return MessageType.TEXT;
    }
    if (this.file) {
      return MessageType.FILE;
    }
  }
}

export class MessageBlock {
  constructor(public date: Date, public messages: IMessage[]) {
    this.messages.sort((first, second) => first.dateTime.getTime() - second.dateTime.getTime());
  }

  public static create(messages: IMessage[]): MessageBlock[] {
    const groupedMessages = new Map<string, IMessage[]>();
    for (const message of messages) {
      const date = message.dateTime.toDateString();
      if (groupedMessages.has(date)) {
        groupedMessages.get(date).push(message);
      } else {
        groupedMessages.set(date, [message]);
      }
    }

    return Array.from(groupedMessages.entries()).map(([date, values]) => new MessageBlock(new Date(date), values));
  }
}
