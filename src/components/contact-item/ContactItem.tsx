import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { IContact } from '../../core/data/contact-data';
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
  const openDialog = () => {
    const url = createHref(RouterPath.DIALOG, {
      id: contact.id
    });
    history.push(url);
  };

  return (
    <div className={classes.container} onClick={openDialog}>
      <LoadedImage size={50} id={contact.avatar} className={classes.avatar}/>
      <div className={classes.info}>
        <div className={classes.info__container}>
          <span className={classes.info__name}>{contact.name}</span>
          <span className={classes.info__date}>{ dateToString(contact.lastMessage?.dateTime) }</span>
        </div>
        <span className={classes.info__message}>{contact.lastMessage?.text || t('message.not')}</span>
      </div>
    </div>
  );
}
