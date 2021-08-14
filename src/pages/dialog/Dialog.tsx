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
          <span className={classes.companion__name}>{contact?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default observer(Dialog);
