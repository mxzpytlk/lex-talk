import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../core/utils/string.utils';
import classes from './dialog-input.module.scss';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';

interface IDialogInputProps {
	contactId: string;
}

const SEND_MESSAGE_MUTATION = loader('../../graphql/mutations/sendMessage.graphql');

export function DialogInput({ contactId }: IDialogInputProps): JSX.Element {
  const [t] = useTranslation();
  const [text, setText] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);

  const sendMessage = () => {
    sendMessageMutation({
      variables: {
        text,
        contactId,
      },
    });
    setText('');
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="lt__input"
        placeholder={capitalize(t('message.type'))}
      />
      <div onClick={() => fileInput.current?.click()} className={classes.paperclip__container}>
        <input ref={fileInput} type="file" className={classes.paperclip__file} />
        <FontAwesomeIcon icon={['fas', 'paperclip']} className={classes.paperclip} />
      </div>
      <div className={classes.send} onClick={sendMessage}>
        <FontAwesomeIcon icon={['fas', 'paper-plane']} />
      </div>
    </div>
  );
}
