import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RouterPath } from '../../core/enums/router-path';
import classes from './dialog.module.scss';
import { Context } from '../../';
import { findHrefParam } from '../../core/utils/navigation.utils';
import { DialogInput } from '../../components/dialog-input/DialogInput';
import { DialogHeader } from '../../components/dialog-header/DialogHeader';

function Dialog(): JSX.Element {
  const { store: { messageStore } } = useContext(Context);
  const location = useLocation();
  const contact = useMemo(
    () => messageStore.getContact(findHrefParam(location.pathname, RouterPath.DIALOG, 'id')),
    [location, messageStore.contacts]
  );

  return (
    <div className={classes.container}>
      <DialogHeader contact={contact} />
      <DialogInput contactId={contact?.id} />
    </div>
  );
}

export default observer(Dialog);
