import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './contacts.module.scss';
import { Menu } from '../menu/Menu';
import AddUser from '../modal/add-user/AddUser';
import { Context } from '../../';
import { observer } from 'mobx-react-lite';
import ReactLoading from 'react-loading';
import { ContactItem } from '../contact-item/ContactItem';
import { includesCaseInsensitive } from '../../core/utils/string.utils';
import Toggler from '../toggler/Toggler';

function Contacts(): JSX.Element {
  const [t] = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const { store: { messageStore, modalStore } } = useContext(Context);
  const contacts = 
    useMemo(
      () => messageStore.contacts.filter((contact) => includesCaseInsensitive(contact.name, searchStr)),
      [messageStore.contacts, searchStr]
    );

  useEffect(() => {
    messageStore.loadContacts();
  }, []);

  const emptyContactsTranslationKey = () => searchStr ? 'user.no_match' : 'user.no_contacts';

  const ContactsContent = () => {
    return (contacts?.length > 0 ?
      contacts.map((contact) => (<ContactItem contact={contact} key={contact.id}/>)) 
      :
      <div className={classes.contacts__container}>
        <span className={classes.contacts__container_text}>{t(emptyContactsTranslationKey())}</span>
      </div>);
  };

  const openAddUser = () => {
    modalStore.open(<AddUser />);
  };

  return (
    <div className={classes.contacts}>
      {showMenu && <Menu onClick={() => setShowMenu(false)}/>}
      <div className={classes.contacts__search}>
        <input
          type="text"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          className={classes.contacts__search_input}
          placeholder={t('chat.search') as unknown as string}
        />
        <FontAwesomeIcon icon={['fas', 'search']} className={classes.contacts__search_icon}/>
        <Toggler isActive={showMenu} onClick={() => setShowMenu(!showMenu)}/>
      </div>
      {messageStore.contactsLoaded ? ContactsContent() : 
        <div className={classes.contacts__container}>
          <ReactLoading type={'bubbles'} color={'blue'} height={150} width={150} />
        </div>
      }
      <div className={classes.contacts__add} onClick={openAddUser}>
        <FontAwesomeIcon icon={['fas', 'user-plus']}/>
      </div>
    </div>
  );
}

export default observer(Contacts);
