import React, {  } from 'react';
import classes from './chat.module.scss';
import { observer } from 'mobx-react-lite';
import Contacts from '../../components/contacts/Contacts';

function Chat(): JSX.Element {

  return (
    <div className={classes.chat}>
      <Contacts />
    </div>
  );
}

export default observer(Chat);
