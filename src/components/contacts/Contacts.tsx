import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './contacts.module.scss';
import classNames from 'classnames';
import { Menu } from '../menu/Menu';
import Modal from '../modal/Modal';
import { AddUser } from '../modal/add-user/AddUser';
import { Context } from '../../';
import { observer } from 'mobx-react-lite';
import ReactLoading from 'react-loading';
import { ContactItem } from '../contact-item/ContactItem';
import { includesCaseInsensitive } from '../../core/utils/string.utils';

function Contacts(): JSX.Element {
  const [t] = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const { messageStore } = useContext(Context).store;
  const contacts = 
    useMemo(
      () => messageStore.contacts.filter((contact) => includesCaseInsensitive(contact.name, searchStr)),
      [messageStore.contacts, searchStr]
    );

  useEffect(() => {
    messageStore.loadContacts();
  }, []);

  const AddUserModal = AddUser({
    close: () => setShowAddUser(false),
  });

  const emptyContactsTranslationKey = () => searchStr ? 'user.no_match' : 'user.no_contacts';

  return (
    <div className={classes.contacts}>
      {showMenu && <Menu onClick={() => setShowMenu(false)}/>}
      {showAddUser && <Modal child={AddUserModal} close={() => setShowAddUser(false)}/>}
      <div className={classes.contacts__search}>
        <input
          type="text"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          className={classes.contacts__search_input}
          placeholder={t('chat.search') as unknown as string}
        />
        <FontAwesomeIcon icon={['fas', 'search']} className={classes.contacts__search_icon}/>
        <div className={classes.contacts__toggler} onClick={() => setShowMenu(!showMenu)}>
          <span
            className={classNames(classes.contacts__toggler_line,
              showMenu && classes['contacts__toggler_line-top'])}
          />
          <span
            className={classNames(classes.contacts__toggler_line,
              showMenu && classes['contacts__toggler_line-center'])}
          />
          <span
            className={classNames(classes.contacts__toggler_line,
              showMenu && classes['contacts__toggler_line-bottom'])}
          />
        </div>
      </div>
      {messageStore.contactsLoaded ? contacts?.length > 0 ?
        contacts.map((contact) => (<ContactItem contact={contact} key={contact.id}/>)) :
        <div className={classes.contacts__container}>
          <span className={classes.contacts__container_text}>{t(emptyContactsTranslationKey())}</span>
        </div> : 
        <div className={classes.contacts__container}>
          <ReactLoading type={'bubbles'} color={'blue'} height={150} width={150} />
        </div>
      }
				
      <div className={classes.contacts__add} onClick={() => setShowAddUser(true)}>
        <FontAwesomeIcon icon={['fas', 'user-plus']}/>
      </div>
    </div>
  );
}

export default observer(Contacts);
