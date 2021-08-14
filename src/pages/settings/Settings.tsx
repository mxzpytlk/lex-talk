import React, { useContext, useState } from 'react';
import { Context } from '../../';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';
import classes from './settings.module.scss';
import { observer } from 'mobx-react-lite';
import Switch from 'react-switch';
import ImageChooser from '../../components/image-chooser/ImageChooser';
import { updateAvatar } from '../../core/utils/image.utils';
import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { Language } from '../../core/enums/languages';
import { useChangeLang } from '../../hooks/use-change-lang';
import classnames from 'classnames';
import { LoadedImage } from '../../components/loaded-image/LoadedImage';
import ReactLoading from 'react-loading';

const UPDATE_USER = loader('../../graphql/mutations/update-user.graphql');

function Settings() {
  const [t] = useTranslation();
  const changeLangHook = useChangeLang();
  const { store } = useContext(Context);
  const { userStore } = store;
  const [updateUser, { loading: aboutLoading }] = useMutation(UPDATE_USER);

  const [aboutValue, setAboutValue] = useState(store.userStore.user?.about as string);
  const [imgChooserOpen, setImgChooserOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>();

  const onImgChange = async (_file: File | null | undefined, blob: Blob | undefined) => {
    if (blob) {
      const src = window.URL.createObjectURL(blob);
      setImgSrc(src);
      setImgChooserOpen(false);
      const imgId = await updateAvatar(blob);
      store.userStore.setAvatar(imgId);
    }
  };

  const updateAbout = async () => {
    const res = await updateUser({ variables: {
      about: aboutValue
    }});
    const user = res.data.updateUser;
    store.userStore.setUser(user);
  };

  const changeLang = async (lang: Language) => {
    changeLangHook(lang);
    await store.configStore.updateConfig({lang});
  };

  const changeDarkMode = async () => 
    store.configStore.updateConfig({ darkMode: !store.configStore.darkMode });

  const checkLang = (lang: Language) => lang === store.configStore.lang;

  const UserAvatar = () => (
    <LoadedImage
      id={userStore.user?.avatar as string}
      size={240}
      onClick={() => setImgChooserOpen(true)}
      className={classes.settings__img_container}
      src={imgSrc}
    >
      <div className={classes.settings__img_hover}>
        {t('settings.change_image')}
      </div>
    </LoadedImage>
  );

  const UpdateAboutBtn = () => {
    if (aboutLoading) {
      return (
        <ReactLoading
          type='spinningBubbles'
          className={classes.settings__about_update}
          width={45}
          height={45}
          color='blue'
        />
      );
    }
    return (
      <button
        className={`lt__submit ${classes.settings__about_update}`}
        onClick={updateAbout}
      >
        {t('common.update')}
      </button>);
  };

  return (
    <div className={classes.settings}>
      <Navbar />
      <h1 className={classes.settings__title}>{t('common.settings')}</h1>
      <hr/>
      {imgChooserOpen ? 
        <ImageChooser onImgChange={onImgChange}/>
        :
        <UserAvatar />
      }
      <div className={classes.settings__about}>
        <input
          type='text'
          className='lt__input'
          value={aboutValue}
          onChange={(e) => setAboutValue(e.target.value)}
        />
        { aboutValue !== userStore.user?.about && <UpdateAboutBtn /> }
      </div>
      <div className={classes.settings__switch}>
        <span>{t('settings.dark')}</span>
        <Switch
          checked={!!store.configStore.darkMode}
          onChange={() => changeDarkMode()}
          onColor='#7905ff'
          onHandleColor='#222222'
          handleDiameter={18}
          uncheckedIcon={false}
          checkedIcon={false}
          activeBoxShadow='none'
        />
      </div>
      <div className={classes.settings__switch}>
        <span>{t('settings.language')}</span>
        <div>
          <span
            className={classnames(
              classes.settings__switch_language,
              checkLang(Language.RU) && classes.settings__switch_cur)
            }
            data-dark={store.configStore.darkMode}
            onClick={() => changeLang(Language.RU)}
          >
            Русский
          </span>
          <span
            className={classnames(
              classes.settings__switch_language,
              checkLang(Language.EN) && classes.settings__switch_cur)
            }
            data-dark={store.configStore.darkMode}
            onClick={() => changeLang(Language.EN)}
          >
            English
          </span>
        </div>
      </div>
    </div>
  );
}

export default observer(Settings);
