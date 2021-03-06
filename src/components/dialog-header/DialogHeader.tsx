import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IContact } from '../../core/data/contact-data';
import { RouterPath } from '../../core/enums/router-path';
import { LoadedImage } from '../loaded-image/LoadedImage';
import { UserProfile } from '../modal/user-profile/UserProfile';
import classes from './dialog-header.module.scss';
import { Context } from '../../';

interface IDialogHeaderProps {
  contact: IContact;
}

export function DialogHeader({ contact }: IDialogHeaderProps): JSX.Element {
  const { store: { modalStore } } = useContext(Context);

  const openUserProfile = () => {
    modalStore.open(<UserProfile contact={contact} />);
  };

  return (
    <div className={classes.header}>
      <Link to={RouterPath.CHAT_REDIRECT}>
        <FontAwesomeIcon icon={['fas', 'arrow-left']} className={classes.header__icon_arrow} />
      </Link>
      <div className={classes.companion} onClick={openUserProfile}>
        <LoadedImage size={40} id={contact?.avatar} className={classes.companion__avatar} loadingColor="white"/>
        <span className={classes.companion__name}>{contact?.name}</span>
      </div>
    </div>
  );
}
