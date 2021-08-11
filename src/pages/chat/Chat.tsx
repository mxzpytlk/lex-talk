import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './chat.module.scss';
import classNames from 'classnames';
import { Menu } from '../../components/menu/Menu';
import Modal from '../../components/modal/Modal';
import { AddUser } from '../../components/modal/add-user/AddUser';

export function Chat(): JSX.Element {
	const [t] = useTranslation();
	const [showMenu, setShowMenu] = useState(false);
	const [showAddUser, setShowAddUser] = useState(false);

	const AddUserModal = AddUser({
		close: () => setShowAddUser(false),
	});

	return (
		<div className={classes.chat}>
			{showMenu && <Menu onClick={() => setShowMenu(false)}/>}
			{showAddUser && <Modal child={AddUserModal} close={() => setShowAddUser(false)}/>}
			<div className={classes.contacts}>
				<div className={classes.contacts__search}>
					<input
						type="text"
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
				<div className={classes.contacts__add} onClick={() => setShowAddUser(true)}>
					<FontAwesomeIcon icon={['fas', 'user-plus']}/>
				</div>
			</div>
		</div>
	);
}