import { MessageBlock } from '../../core/data/message';
import { dateToString } from '../../core/utils/date.utils';
import { Message } from '../message/Message';
import classes from './messages-block.module.scss';

interface IMessageBlockProps {
  block: MessageBlock;
}

export function MessagesBlock({ block }: IMessageBlockProps): JSX.Element {
  const messages = block.messages;

  return (
    <div className={classes.container}>
      <span className={classes.date} >
        { dateToString(block.date) }
      </span>
      {messages.map((message) => <Message message={message} key={message.dateTime.toISOString()}/>)}
    </div>
  );
}