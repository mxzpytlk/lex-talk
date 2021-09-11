import { loader } from 'graphql.macro';
import { useSubscription } from 'react-apollo';
import { IMessageGQL } from '../core/data/message';

const MESSAGE_SUBSCRIPTION = loader('../graphql/subscriptions/message-sent.graphql');

type SentMessageData = {
  messageSent: IMessageGQL;
};

export function useMessagesSubscription(): IMessageGQL {
  const { data } = useSubscription<SentMessageData>(
    MESSAGE_SUBSCRIPTION
  );
  return data?.messageSent;
}
