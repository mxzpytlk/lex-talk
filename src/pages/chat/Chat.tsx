import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './chat.scss';
import classNames from 'classnames';
import { Menu } from '../../components/menu/Menu';
import Modal from '../../components/modal/Modal';
import { AddUser } from '../../components/modal/add-user/AddUser';

export function Chat() {
  const [t] = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const AddUserModal = AddUser();

  return (
    <div className='chat'>
      {showMenu && <Menu onClick={() => setShowMenu(false)}/>}
      {showAddUser && <Modal child={AddUserModal} close={() => setShowAddUser(false)}/>}
      <div className='contacts'>
        <div className='contacts__search'>
          <input
            type="text"
            className='contacts__search_input'
            placeholder={t('chat.search') as unknown as string}
          />
          <FontAwesomeIcon icon={['fas', 'search']} className='contacts__search_icon'/>
          <div className='contacts__toggler' onClick={() => setShowMenu(!showMenu)}>
            <span
              className={classNames('contacts__toggler_line',
                showMenu && 'contacts__toggler_line-top')}
            />
            <span
              className={classNames('contacts__toggler_line',
                showMenu && 'contacts__toggler_line-center')}
            />
            <span
              className={classNames('contacts__toggler_line',
                showMenu && 'contacts__toggler_line-bottom')}
            />
          </div>
        </div>
        <div className='contacts__add' onClick={() => setShowAddUser(true)}>
          <FontAwesomeIcon icon={['fas', 'user-plus']}/>
        </div>
      </div>
    </div>
  );
}