import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../core/utils/string.utils';
import classes from './dialog-input.module.scss';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { sendImg } from '../../core/utils/image.utils';
import { Context } from '../../';
import { IMessage, MessageType } from '../../core/data/message';

interface IDialogInputProps {
	contactId: string;
}

const SEND_MESSAGE_MUTATION = loader('../../graphql/mutations/sendMessage.graphql');

export function DialogInput({ contactId }: IDialogInputProps): JSX.Element {
  const [t] = useTranslation();
  const [text, setText] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);
  const {
    store: { messageStore, userStore },
  } = useContext(Context);

  const sendMessage = () => {
    sendMessageMutation({
      variables: {
        text,
        contactId,
      },
    });
    const message: IMessage = {
      text,
      dateTime: new Date(),
      type: MessageType.TEXT,
      sender: userStore.user.id,
    };
    messageStore.addMessage(message);
    setText('');
  };

  const sendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sendImg(file, contactId);
      // TODO Сделать обновление изображений
      // const fileUrl = window.URL.createObjectURL(file);
      // const img = new Image();
      // img.src = fileUrl;
      // img.onload = () => {
      //   const message: IMessage = {
      //     file: fileUrl,
      //     dateTime: new Date(),
      //     type: MessageType.FILE,
      //     sender: userStore.user.id,
      //   };
      //   messageStore.addMessage(message);
      // };
    }
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
        <input
          ref={fileInput}
          type="file"
          className={classes.paperclip__file}
          onChange={sendImage}
          multiple={false}
          accept=".jpeg, .png, .jpg"
        />
        <FontAwesomeIcon icon={['fas', 'paperclip']} className={classes.paperclip} />
      </div>
      <div className={classes.send} onClick={sendMessage}>
        <FontAwesomeIcon icon={['fas', 'paper-plane']} />
      </div>
    </div>
  );
}
