import { IMessage, IMessageGQL, MessageData } from './message';

export interface IContact {
	id: string;
	name: string;
	about: string;
	avatar: string;
	lastMessage?: IMessage;
}

export interface IContactGQL {
	id: string;
	name: string;
	about: string;
	avatar: string;
	lastMessage?: IMessageGQL;
}

export class ContactData implements IContact {
  public lastMessage: IMessage;

  constructor(private contact: IContactGQL) {
    this.lastMessage = contact.lastMessage ? new MessageData(contact.lastMessage) : null;
  }

  public get id(): string {
    return this.contact.id;
  }

  public get name(): string {
    return this.contact.name;
  }

  public get about(): string {
    return this.contact.about;
  }

  public get avatar(): string {
    return this.contact.avatar;
  }
}
