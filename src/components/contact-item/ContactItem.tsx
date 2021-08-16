import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { IContact } from '../../core/data/contact-data';
import { MessageType } from '../../core/data/message';
import { RouterPath } from '../../core/enums/router-path';
import { dateToString } from '../../core/utils/date.utils';
import { createHref } from '../../core/utils/navigation.utils';
import { LoadedImage } from '../loaded-image/LoadedImage';
import classes from './contact-item.module.scss';

interface IContactItemProps {
	contact: IContact;
}

export function ContactItem(props: IContactItemProps): JSX.Element {
  const [t] = useTranslation();
  const history = useHistory();

  const contact = props.contact;
  const lastMessage = contact.lastMessage;

  const openDialog = () => {
    const url = createHref(RouterPath.DIALOG, {
      id: contact.id,
    });
    history.push(url);
  };

  const Message = () => {
    if (lastMessage?.type === MessageType.FILE) {
      return (
        <span className={classes.info__message}>
          <FontAwesomeIcon icon={['fas', 'image']} />
          <span className={classes.info__message_image}>{ t('common.image') }</span>
        </span>
      );
    }

    return (
      <span className={classes.info__message}>
        {lastMessage?.text ?? t('message.not')}
      </span>
    );
  };

  return (
    <div className={classes.container} onClick={openDialog}>
      <LoadedImage size={50} id={contact.avatar} className={classes.avatar} />
      <div className={classes.info}>
        <div className={classes.info__container}>
          <span className={classes.info__name}>{contact.name}</span>
          {contact.lastMessage?.dateTime && (
            <span className={classes.info__date}>
              {dateToString(contact.lastMessage?.dateTime)}
            </span>
          )}
        </div>
        <Message />
      </div>
    </div>
  );
}
