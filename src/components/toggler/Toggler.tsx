import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import classes from './toggler.module.scss';
import { Context } from '../../';
import { useContext } from 'react';


type TogglerProps = {
  isActive: boolean;
  onClick: (args: unknown) => unknown;
  isDarkable?: boolean;
}

function Toggler(props: TogglerProps): JSX.Element {
  const { isActive, onClick } = props;
  const { store: { configStore } } = useContext(Context);

  return (
    <div className={classes.toggler} onClick={onClick}>
      <span
        data-darkable={!!props.isDarkable}
        data-dark={configStore.darkMode}
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-top']
        )}
      />
      <span
        data-darkable={!!props.isDarkable}
        data-dark={configStore.darkMode}
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-center']
        )}
      />
      <span
        data-darkable={!!props.isDarkable}
        data-dark={configStore.darkMode}
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-bottom']
        )}
      />
    </div>
  );
}

export default observer(Toggler);
