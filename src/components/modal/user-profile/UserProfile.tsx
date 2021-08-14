import { useTranslation } from 'react-i18next';
import { IContact } from '../../../core/data/contact-data';
import { getImgUrl } from '../../../core/utils/image.utils';
import classes from './user-profile.module.scss';

interface IProfileProps {
  contact: IContact;
}

export function UserProfile({ contact }: IProfileProps): JSX.Element {
  const [t] = useTranslation();
  const avatarStyle = {
    backgroundImage: `url(${getImgUrl(contact?.avatar)})`,
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>{t('user.profile')}</h4>
      <hr className={classes.hr}/>
      <div className={classes.info}>
        <div style={avatarStyle} className={classes.info__avatar}></div>
        <h5 className={classes.info__details}>
          <span className={classes.info__details_title}>{t('common.username')}</span>
          <span className={classes.info__details_text}>{contact.name}</span>
        </h5>
        <h5 className={classes.info__details}>
          <span className={classes.info__details_title}>{t('details.about')}</span>
          <span className={classes.info__details_text}>{contact.about}</span>
        </h5>
      </div>
    </div>
  );
}