import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQLError } from '../../../core/data/gql-error';
import { useAddContact } from '../../../hooks/use-add-contact';
import { IModal } from '../modal.interface';
import './add-user.scss';

export function AddUser(props: IModal): JSX.Element {
	const [t] = useTranslation();
	const [contactName, setContactName] = useState('');
	const [errMessage, setErrMessage] = useState('');
	const addContact = useAddContact();

	const findUser = async () => {
		try {
			await addContact(contactName);
			setErrMessage('');
			props.close();
		} catch (e) {
			const err = new GQLError(e);
			setErrMessage(err.message);
		}
	};

	return (
		<div className="add-user">
			<h4 className="add-user__title">{t('user.add_to')}</h4>
			<hr />
			<input
				type="text"
				value={contactName}
				onChange={(e) => setContactName(e.target.value)}
				className="lt__input add-user__input"
				placeholder={t('common.username')}
			/>
			{errMessage && (
				<div className="add-user__error">
					<div className="add-user__error_icon">
						<FontAwesomeIcon icon={['fas', 'exclamation']} />
					</div>
					<span className="add-user__error_msg">{t(errMessage)}</span>
				</div>
			)}
			<div>
				<button onClick={findUser} className="lt__submit">
					{t('user.add_contact')}
				</button>
			</div>
		</div>
	);
}
