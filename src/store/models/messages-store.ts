import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { ContactData, IContact, IContactGQL } from '../../core/data/contact-data';
import { client } from '../../graphql/';


const CONTACTS_QUERY = loader('../../graphql/queries/contacts.graphql');
interface IContactsQuery {
  contacts: IContactGQL[];
}

export class MessagesStore {
  public contacts: IContact[] = [];
  public contactsLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  public addContacts(...contacts: IContact[]): void {
    this.setContacts([...this.contacts, ...contacts]);
  }

  public setContacts(contacts: IContact[]): void {
    this.contacts = contacts;
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
}
