import { useTranslation } from 'react-i18next';
import { IContact } from '../../../core/data/contact-data';
import { LoadedImage } from '../../loaded-image/LoadedImage';
import classes from './user-profile.module.scss';

interface IProfileProps {
  contact: IContact;
}

export function UserProfile({ contact }: IProfileProps): JSX.Element {
  const [t] = useTranslation();

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>{t('user.profile')}</h4>
      <hr className={classes.hr}/>
      <div className={classes.info}>
        <LoadedImage size={160} id={contact.avatar} className={classes.info__avatar}/>
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