import React from 'react';
import styles from './navbar.module.css';
import getNavbarItems from '../../utils/navigationItems';
import NavbarListItem from './listItem/listItem';

const Navbar = () => {
  const navbarItems = getNavbarItems();

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
