import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../';
import classes from './modal.module.scss';

interface IModal {
	child: JSX.Element;
	close: () => void;
}

function Modal(props: IModal): JSX.Element {
	const { store } = useContext(Context);

	return (
		<div className={classes.modal__background} onClick={props.close}>
			<div
				className={classes.modal}
				data-dark={store.configStore.darkMode}
				onClick={(e) => e.stopPropagation()}
			>
				<FontAwesomeIcon
					icon={['fas', 'times']}
					className={classes.modal__close}
					onClick={props.close}
				/>
				{props.child}
			</div>
		</div>
	);
}

export default observer(Modal);
