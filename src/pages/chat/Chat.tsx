import React, {  } from 'react';
import classes from './chat.module.scss';
import { observer } from 'mobx-react-lite';
import Contacts from '../../components/contacts/Contacts';
import { ChatRouter } from '../../route/ChatRouter';

function Chat(): JSX.Element {

  return (
    <div className={classes.chat}>
      <Contacts />
      <ChatRouter />
    </div>
  );
}

export default observer(Chat);
