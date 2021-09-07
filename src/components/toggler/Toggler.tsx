import classNames from 'classnames';
import classes from './toggler.module.scss';


type TogglerProps = {
  isActive: boolean;
  onClick: (args: unknown) => unknown;
}

export function Toggler(props: TogglerProps): JSX.Element {
  const { isActive, onClick } = props;

  return (
    <div className={classes.toggler} onClick={onClick}>
      <span
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-top']
        )}
      />
      <span
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-center']
        )}
      />
      <span
        className={classNames(
          classes.toggler_line,
          isActive && classes['toggler_line-bottom']
        )}
      />
    </div>
  );
}
