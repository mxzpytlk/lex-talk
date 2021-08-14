import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { IContact } from '../../core/data/contact-data';
import { client } from '../../graphql/';


const CONTACTS_QUERY = loader('../../graphql/queries/contacts.graphql');
interface IContactsQuery {
  contacts: IContact[];
}

export class MessagesStore {
  public contacts: IContact[] = [];
  public contactsLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  public addContacts(contacts: IContact[]): void {
    this.contacts.push(...contacts);
  }

  public setContacts(contacts: IContact[]): void {
    this.contacts = contacts;
  }

  public loadContacts = async (): Promise<void> => {
    try {
      const data = await client.query<IContactsQuery>({
        query: CONTACTS_QUERY
      });
      const contacts = data?.data?.contacts;
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
}
