import { useContext, useState } from 'react';
import { Context } from '../../';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import './settings.scss';
import { observer } from 'mobx-react-lite';
import Switch from 'react-switch';

function Settings() {
  const [t] = useTranslation();
	const { store } = useContext(Context);
  const [aboutValue, setAboutValue] = useState(store.user?.about as string);
  const [testToggler, setTestToggler] = useState(false);
  const pictureStyle = {
    backgroundImage: `url(http://localhost:5000/api/file/${store.user?.avatar})`,
  };

  return (
    <div className='settings'>
      <Navbar />
      <h1 className='settings__title'>{t('common.settings')}</h1>
      <hr/>
      <div className='settings__img_container' style={pictureStyle}>
        <div className='settings__img_hover'>
          {t('settings.change_image')}
        </div>
      </div>
      <div className='settings__about'>
        <input
          type='text'
          className='lt__input'
          value={aboutValue}
          onChange={(e) => setAboutValue(e.target.value)}
        />
        {
          aboutValue !== store.user?.about &&
          <button className='lt__submit settings__about_update'>{t('common.update')}</button>
        }
      </div>
      <div className='settings__switch'>
        <span>{t('settings.dark')}</span>
        <Switch
          checked={testToggler}
          onChange={() => setTestToggler(!testToggler)}
          onColor='#7905ff'
          onHandleColor='#222222'
          handleDiameter={18}
          uncheckedIcon={false}
          checkedIcon={false}
          activeBoxShadow='none'
        />
      </div>
      <div className='settings__switch'>
        <span>{t('settings.language')}</span>
        <div>
          <span className='settings__switch_language'>Русский</span>
          <span className='settings__switch_language'>English</span>
        </div>
      </div>
    </div>
  );
}

export default observer(Settings);
