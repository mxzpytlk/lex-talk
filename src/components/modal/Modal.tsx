import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './modal.scss';

interface IModal {
	child: JSX.Element;
	close: () => void;
}

export function Modal(props: IModal) {
	return (
		<div className='modal__background' onClick={props.close}>
			<div className='modal' onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={['fas', 'times']} className='modal__close' onClick={props.close}/>
        {props.child}
      </div>
		</div>
	);
}
