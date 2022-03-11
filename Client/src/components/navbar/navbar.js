import React, { useContext } from 'react';
import styles from './navbar.module.css';
import getNavbarItems from '../../utils/navigationItems';
import NavbarListItem from './listItem/listItem';
import UserContext from '../../utils/context';

const Navbar = () => {
  const context = useContext(UserContext);
  const navbarItems = getNavbarItems(context.user.username);

  return (
    <nav className={styles.navigation}>
      <ul>
        {navbarItems.map((navItem, index) => {
          return (
            <NavbarListItem
              key={index}
              href={navItem.href}
              text={navItem.text}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
