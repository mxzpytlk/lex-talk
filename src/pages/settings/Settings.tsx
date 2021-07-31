import React, { useContext, useState } from 'react';
import { Context } from '../../';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import './settings.scss';
import { observer } from 'mobx-react-lite';
import Switch from 'react-switch';
import ImageChooser from '../../components/image-chooser/ImageChooser';
import { getImgUrl } from '../../core/utils/image.utils';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { Language } from '../../core/enums/languages';
import { LocalStorageKey } from '../../core/enums/local-storage-key';

const UPDATE_USER = loader('../../graphql/mutations/update-user.graphql');

function Settings() {
  const [t, i18n] = useTranslation();
	const { store } = useContext(Context);
  const [updateUser] = useMutation(UPDATE_USER);

  const [aboutValue, setAboutValue] = useState(store.user?.about as string);
  const [testToggler, setTestToggler] = useState(false);
  const [imgChooserOpen, setImgChooserOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(getImgUrl(store?.user?.avatar as string));
  
  const pictureStyle = {
    backgroundImage: `url(${imgSrc})`,
  };

  const onImgChange = async (file: File | null | undefined, blob: Blob | undefined) => {
    const fileName = `${file?.name.split('.')[0]}.jpeg`;
    if (blob) {
      const src = window.URL.createObjectURL(blob);
      setImgSrc(src);
      setImgChooserOpen(false);
      const res = await updateUser({ variables: {
        avatar: new File([blob], fileName, {
          type: 'image/jpeg'
        })
      }});
      const user = res.data.updateUser;
      store.setUser(user);
    }
  }

  const updateAbout = async () => {
    const res = await updateUser({ variables: {
      about: aboutValue
    }});
    const user = res.data.updateUser;
    store.setUser(user);
  }

  const changeLang = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LocalStorageKey.LANG, lang);
  };

  return (
    <div className='settings'>
      <Navbar />
      <h1 className='settings__title'>{t('common.settings')}</h1>
      <hr/>
      {imgChooserOpen ? 
        <ImageChooser onImgChange={onImgChange}/>
        :
        <div className='settings__img_container' style={pictureStyle} onClick={() => setImgChooserOpen(true)}>
          <div className='settings__img_hover'>
            {t('settings.change_image')}
          </div>
        </div>
      }
      <div className='settings__about'>
        <input
          type='text'
          className='lt__input'
          value={aboutValue}
          onChange={(e) => setAboutValue(e.target.value)}
        />
        {
          aboutValue !== store.user?.about &&
          <button className='lt__submit settings__about_update' onClick={updateAbout}>{t('common.update')}</button>
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
          <span className='settings__switch_language' onClick={() => changeLang(Language.RU)}>Русский</span>
          <span className='settings__switch_language' onClick={() => changeLang(Language.EN)}>English</span>
        </div>
      </div>
    </div>
  );
}

export default observer(Settings);
