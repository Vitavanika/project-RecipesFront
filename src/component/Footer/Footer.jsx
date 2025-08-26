import { NavLink } from 'react-router';
import { FooterNav } from '../FooterNav/FooterNav';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContainer}>
          <NavLink to="/" className={styles.logoContainer}>
            <svg className={styles.logoIcon} width="32" height="32">
              <use href="/src/images/icons.svg#icon-Group-6884"></use>
            </svg>
            <p className={styles.logoText}>Tasteorama</p>
          </NavLink>
          <p className={styles.descr}>
            © 2025 CookingCompanion. All rights reserved.
          </p>
          <FooterNav />
        </div>
      </div>
    </footer>
  );
};
