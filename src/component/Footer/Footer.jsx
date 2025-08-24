import { FooterNav } from '../FooterNav/FooterNav';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <svg className={styles.logoIcon} width="32" height="32">
            <use href="/images/icons.svg#icon-Group-6884"></use>
          </svg>
          <p className={styles.logoText}>Tasteorama</p>
        </div>
        <p className={styles.descr}>
          © 2025 CookingCompanion. All rights reserved.
        </p>
        <FooterNav />
      </div>
    </div>
  );
};
