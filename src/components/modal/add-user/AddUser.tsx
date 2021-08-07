import { useTranslation } from 'react-i18next';
import './add-user.scss';

export function AddUser() {
  const [t] = useTranslation();

  return (
    <div className='add-user'>
      <h4 className='add-user__title'>{t('user.add_to')}</h4>
      <hr/>
      <input type='text' className='lt__input add-user__input' placeholder={t('common.username')}/>
      <div>
        <button className='lt__submit'>{t('user.add_contact')}</button>
      </div>
    </div>
  );
}