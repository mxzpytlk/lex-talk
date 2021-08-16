import { IMessage, MessageType } from '../../core/data/message';
import classes from './message.module.scss';
import { Context } from '../../';
import { useContext, useMemo, useState } from 'react';
import classnames from 'classnames';
import { LoadedImage } from '../loaded-image/LoadedImage';
import Modal from '../modal/Modal';
import { ImageModal } from '../modal/image-modal/ImageModal';

interface IMessageProps {
	message: IMessage;
}

export function Message({ message }: IMessageProps): JSX.Element {
  const {
    store: { userStore, configStore },
  } = useContext(Context);
  const [isImgOpen, setIsImgOpen] = useState(false);
  const fromCurrentUser = useMemo(() => userStore.user.id === message.sender, [userStore.user]);
  const imgStyle = {
    borderRadius: '0',
  };

  return (
    <div
      className={classnames(
        classes.message,
        fromCurrentUser ? classes.message__current : classes.message__another
      )}
      data-dark={configStore.darkMode}
    >
      {isImgOpen && (
        <Modal close={() => setIsImgOpen(false)}>
          <ImageModal photo={message} />
        </Modal>
      )}
      {message.type === MessageType.TEXT && message.text}
      {message.type === MessageType.FILE && (
        <LoadedImage
          className={classes.message__img}
          style={imgStyle}
          id={message.file}
          size={100}
          isImgTag={true}
          onClick={() => setIsImgOpen(true)}
        />
      )}
    </div>
  );
}
