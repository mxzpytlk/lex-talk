import { IMessage, MessageType } from '../../core/data/message';
import classes from './message.module.scss';
import { Context } from '../../';
import { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { LoadedImage } from '../loaded-image/LoadedImage';
import { ImageModal } from '../modal/image-modal/ImageModal';

interface IMessageProps {
	message: IMessage;
}

export function Message({ message }: IMessageProps): JSX.Element {
  const {
    store: { userStore, configStore, modalStore },
  } = useContext(Context);
  const fromCurrentUser = useMemo(() => userStore.user.id === message.sender, [userStore.user]);
  const imgStyle = {
    borderRadius: '0',
  };

  const openImg = () => {
    modalStore.open(<ImageModal photo={message} />);
  };

  return (
    <div
      className={classnames(
        classes.message,
        fromCurrentUser ? classes.message__current : classes.message__another
      )}
      data-dark={configStore.darkMode}
    >
      {message.type === MessageType.TEXT && message.text}
      {message.type === MessageType.FILE && (
        <LoadedImage
          className={classes.message__img}
          style={imgStyle}
          id={message.file}
          size={100}
          isImgTag={true}
          onClick={openImg}
        />
      )}
    </div>
  );
}
