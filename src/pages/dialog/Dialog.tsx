import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouterPath } from '../../core/enums/router-path';
import classes from './dialog.module.scss';
import { Context } from '../../';
import { findHrefParam } from '../../core/utils/navigation.utils';
import { getImgUrl } from '../../core/utils/image.utils';
import Modal from '../../components/modal/Modal';
import { UserProfile } from '../../components/modal/user-profile/UserProfile';
import { LoadedImage } from '../../components/loaded-image/LoadedImage';
import { DialogInput } from '../../components/dialog-input/DialogInput';

function Dialog(): JSX.Element {
  const { store } = useContext(Context);
  const { messageStore } = store;
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const location = useLocation();
  const contact = useMemo(
    () => messageStore.getContact(findHrefParam(location.pathname, RouterPath.DIALOG, 'id')),
    [location, messageStore.contacts]
  );
  const avatarStyle = {
    backgroundImage: `url(${getImgUrl(contact?.avatar)})`,
  };

  return (
    <div className={classes.container}>
      {userProfileOpen && <Modal close={() => setUserProfileOpen(false)}><UserProfile contact={contact} /></Modal>}
      <div className={classes.header}>
        <Link to={RouterPath.CHAT_REDIRECT}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className={classes.header__icon_arrow} />
        </Link>
        <div className={classes.companion} onClick={() => setUserProfileOpen(true)}>
          <div style={avatarStyle} className={classes.companion__avatar}></div>
          <LoadedImage size={40} id={contact?.avatar} className={classes.companion__avatar} loadingColor="white"/>
          <span className={classes.companion__name}>{contact?.name}</span>
        </div>
      </div>
      <DialogInput contactId={contact.id} />
    </div>
  );
}

export default observer(Dialog);
