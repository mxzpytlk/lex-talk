import { useTranslation } from 'react-i18next';
import { IContact } from '../../core/data/contact-data';
import { getImgUrl } from '../../core/utils/image.utils';
import classes from './contact-item.module.scss';

interface IContactItemProps {
	contact: IContact;
}

export function ContactItem(props: IContactItemProps): JSX.Element {
  const [t] = useTranslation();

  const contact = props.contact;
  const avatarStyle = {
    backgroundImage: `url(${getImgUrl(contact.avatar)})`,
  };

  return (<div className={classes.container}>
    <div style={avatarStyle} className={classes.avatar}></div>
    <div className={classes.info}>
      <span className={classes.info__name}>{contact.name}</span>
      <span className={classes.info__message}>{contact.lastMessage || t('message.not')}</span>
    </div>
  </div>);
}
