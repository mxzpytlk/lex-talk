import { loader } from 'graphql.macro';
import { ExecutionResult, useMutation } from 'react-apollo';

const ADD_CONTACT_MUTATION = loader('../graphql/mutations/add-contact.graphql');

type AddContactHookResult = { 
  addContact: (name: string) => Promise<ExecutionResult<{ id: string; }>>;
  isLoading: boolean; 
}

export function useAddContact(): AddContactHookResult {
  const [addContactMutation, data] = useMutation<{ id: string }>(ADD_CONTACT_MUTATION);

  const addContact = async (name: string) => {
    try {
      return await addContactMutation({ variables: { name } });
    } catch (e) {
      throw e?.networkError?.result?.errors?.[0] || e;
    }
  };
  return { addContact, isLoading: data.loading };
}
