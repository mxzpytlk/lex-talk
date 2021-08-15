import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQLError } from '../../../core/data/gql-error';
import { useAddContact } from '../../../hooks/use-add-contact';
import { IModal } from '../modal.interface';
import classes from './add-user.module.scss';
import classname from 'classnames';
import ReactLoading from 'react-loading';
import { Context } from '../../../';
import { observer } from 'mobx-react-lite';

function AddUser(props: IModal): JSX.Element {
  const [t] = useTranslation();
  const [contactName, setContactName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const { store: { messageStore } } = useContext(Context);
  const { addContact, isLoading } = useAddContact();

  const findUser = async () => {
    try {
      const res = await addContact(contactName);
      const newContact = res.data?.addContact;

      if (newContact) {
        newContact.name = contactName;
        messageStore.addContacts(newContact);
      }

      setErrMessage('');
      props.close();
    } catch (e) {
      const err = new GQLError(e);
      setErrMessage(err.message);
    }
  };

  return (
    <div className={classes['add-user']}>
      <h4 className={classes['add-user__title']}>{t('user.add_to')}</h4>
      <hr />
      <input
        type="text"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        className={`lt__input ${classes['add-user__input']}`}
        placeholder={t('common.username')}
      />
      {errMessage && (
        <div className={classes['add-user__error']}>
          <div className={classes['add-user__error_icon']}>
            <FontAwesomeIcon icon={['fas', 'exclamation']} />
          </div>
          <span className={classes['add-user__error_msg']}>{t(errMessage)}</span>
        </div>
      )}
      <div>
        {isLoading ?
          <ReactLoading width={70} height={70} color='blue' type='spinningBubbles'/>
          :
          <button onClick={findUser} className={classname('lt__submit', classes.submit)}>
            {t('user.add_contact')}
          </button>}
      </div>
    </div>
  );
}

export default observer(AddUser);
