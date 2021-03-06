import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { RouterPath } from '../../core/enums/router-path';
import classes from './dialog.module.scss';
import { Context } from '../../';
import { findHrefParam } from '../../core/utils/navigation.utils';
import { DialogInput } from '../../components/dialog-input/DialogInput';
import { DialogHeader } from '../../components/dialog-header/DialogHeader';
import { MessagesBlock } from '../../components/messages-block/MessagesBlock';
import { useMessagesSubscription } from '../../hooks/use-messages-subscribe';
import { MessageData } from '../../core/data/message';

function Dialog(): JSX.Element {
  const {
    store: { messageStore, configStore },
  } = useContext(Context);

  const newMessage = useMessagesSubscription();

  useEffect(() => {
    if (newMessage) {
      messageStore.addMessage(new MessageData(newMessage));
    }
  }, [newMessage]);

  const scrollableElement = useRef<HTMLDivElement>();

  const location = useLocation();
  const contact = useMemo(
    () => messageStore.getContact(findHrefParam(location.pathname, RouterPath.DIALOG, 'id')),
    [location, messageStore.contacts]
  );

  useEffect(() => {
    if (contact?.id) {
      messageStore.loadMessages(contact.id);
    }
  }, [contact]);

  const blocks = useMemo(() => messageStore.getMessageBlocks(), [messageStore.messages]);

  useEffect(() => {
    const current = scrollableElement.current;
    if (messageStore.messages?.length > 0) {
      current.scrollTop = current.scrollHeight;
    }
  }, [messageStore.messages, location]);

  return (
    <div className={classes.container} data-dark={configStore.darkMode}>
      <DialogHeader contact={contact} />
      <div className={classes.messages} ref={scrollableElement}>
        {blocks.map((block) => (
          <MessagesBlock block={block} key={block.date.toDateString()} />
        ))}
      </div>
      <DialogInput contactId={contact?.id} />
    </div>
  );
}

export default observer(Dialog);
