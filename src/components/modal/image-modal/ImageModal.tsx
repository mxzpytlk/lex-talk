import { useTranslation } from 'react-i18next';
import { IMessage } from '../../../core/data/message';
import { dateTimeToString } from '../../../core/utils/date.utils';
import { getImgUrl } from '../../../core/utils/image.utils';
import classes from './image-modal.module.scss';

interface ImageModalProps {
  photo: IMessage;
}

export function ImageModal({ photo }: ImageModalProps): JSX.Element {
  const [t] = useTranslation();

  return (
    <div>
      <h4 className={classes.title}>{t('common.image')}</h4>
      <hr className={classes.hr}/>
      <img className={classes.img} src={getImgUrl(photo.file)} alt=""/>
      <br/>
      <span className={classes.date}>{ dateTimeToString(photo.dateTime) }</span>
    </div>
  );
}