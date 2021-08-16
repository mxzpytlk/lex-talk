import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { ContactData, IContact, IContactGQL } from '../../core/data/contact-data';
import { IMessage, IMessageGQL, MessageBlock, MessageData } from '../../core/data/message';
import { client } from '../../graphql/';


const CONTACTS_QUERY = loader('../../graphql/queries/contacts.graphql');
interface IContactsQuery {
  contacts: IContactGQL[];
}

const MESSAGES_QUERY = loader('../../graphql/queries/messages.graphql');
interface IMessageQuery {
  messages: IMessageGQL[];
}

export class MessagesStore {
  public contacts: IContact[] = [];
  public messages: IMessage[];
  public contactsLoaded = false;
  public messagesLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  public addContacts(...contacts: IContact[]): void {
    this.setContacts([...this.contacts, ...contacts]);
  }

  public setContacts(contacts: IContact[]): void {
    this.contacts = contacts;
  }

  public setMessages(messages: IMessage[]): void {
    this.messages = messages;
  }

  public getMessageBlocks(): MessageBlock[] {
    return this.messages ? MessageBlock.create(this.messages) : [];
  }

  public getContact(id: string): IContact {
    return this.contacts.find((contact) => contact.id === id) as IContact;
  }

  public loadContacts = async (): Promise<void> => {
    try {
      const data = await client.query<IContactsQuery>({
        query: CONTACTS_QUERY,
        fetchPolicy: this.contactsLoaded ? 'cache-first' : 'network-only'
      });
      const contacts = data?.data?.contacts?.map((contact) => new ContactData(contact));
      if (!contacts) {
        return;
      }
      this.setContacts(contacts);
    } catch (e) {
      console.log(e);
    } finally {
      this.contactsLoaded = true;
    }
  }

  public removeContacts(): void {
    this.contacts.splice(0);
    this.contactsLoaded = false;
  }

  public async loadMessages(contactId: string): Promise<void> {
    try {
      const data = await client.query<IMessageQuery>({
        query: MESSAGES_QUERY,
        fetchPolicy: 'network-only',
        variables: {
          contactId
        }
      });
      const messages = data?.data?.messages?.map((message) => new MessageData(message));
      if (!messages) {
        return;
      }
      this.setMessages(messages);
    } catch (e) {
      console.log(e);
    } finally {
      this.messagesLoaded = true;
    }
  }
}
