import { loader } from 'graphql.macro';
import { ExecutionResult, useMutation } from 'react-apollo';
import { IContact } from '../core/data/contact-data';

const ADD_CONTACT_MUTATION = loader('../graphql/mutations/add-contact.graphql');

type AddContactHookResult = { 
  addContact: (name: string) => Promise<ExecutionResult< { addContact: IContact} >>;
  isLoading: boolean; 
}

export function useAddContact(): AddContactHookResult {
  const [addContactMutation, data] = useMutation< { addContact: IContact} >(ADD_CONTACT_MUTATION);

  const addContact = async (name: string) => {
    try {
      return await addContactMutation({ variables: { name } });
    } catch (e) {
      throw e?.networkError?.result?.errors?.[0] || e;
    }
  };
  return { addContact, isLoading: data.loading };
}
