import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../'
import './modal.scss';

interface IModal {
	child: JSX.Element;
	close: () => void;
}

function Modal(props: IModal) {
  const { store } = useContext(Context);

	return (
		<div className='modal__background' onClick={props.close}>
			<div className={store.configStore.darkClass('modal')} onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={['fas', 'times']} className='modal__close' onClick={props.close}/>
        {props.child}
      </div>
		</div>
	);
}

export default observer(Modal);
