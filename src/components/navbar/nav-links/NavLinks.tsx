import { observer } from 'mobx-react-lite';
import classes from './nav-links.module.scss';
import React, { useContext, useState } from 'react';
import { Context } from '../../../';
import { INavigationLink, links } from '../../../core/data/navigation-link';
import { ScreenSize } from '../../../store/models/screen-size.store';
import { Menu } from '../../menu/Menu';
import { NavigationLink } from '../../navigation-link/NavigationLink';
import { Toggler } from '../../toggler/Toggler';

const NavLinks = () => {
  const {
    store: { screenSizeStore, userStore },
  } = useContext(Context);
  const [isTogglerActive, setIsTogglerActive] = useState(false);

  const isActive = (link: INavigationLink) => userStore.isAuth === link.needAuth;

  return screenSizeStore.screenSize > ScreenSize.SMALL_LAPTOP ? (
    <div className={classes.nav__btns}>
      {links.filter(isActive).map((link) => (
        <NavigationLink link={link} key={link.text} />
      ))}
    </div>
  ) : (
    <>
      {isTogglerActive && <Menu onClick={() => setIsTogglerActive(false)} />}
      <Toggler isActive={isTogglerActive} onClick={() => setIsTogglerActive(!isTogglerActive)} />
    </>
  );
};

export default observer(NavLinks);
