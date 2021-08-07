import { loader } from 'graphql.macro';
import { ExecutionResult, useMutation } from 'react-apollo';

const ADD_CONTACT_MUTATION = loader('../graphql/mutations/add-contact.graphql');

export function useAddContact(): (
	name: string
) => Promise<ExecutionResult<{ id: string }> | undefined> {
	const [addContactMutation] = useMutation<{ id: string }>(ADD_CONTACT_MUTATION);

	const addContact = async (name: string) => {
		try {
			return await addContactMutation({ variables: { name } });
		} catch (e) {
			throw e?.networkError?.result?.errors?.[0] || e;
		}
	};
	return addContact;
}
