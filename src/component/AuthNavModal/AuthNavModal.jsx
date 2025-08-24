import { forwardRef } from 'react';
import { NavLink } from 'react-router';

import styles from './AuthNavModal.module.css';

export const AuthNavModal = forwardRef(({ onClick }, ref) => {
  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.container}>
        <button onClick={onClick} className={styles.closeModalButton}>
          <svg className={styles.closeIcon} width="24" height="24">
            <use href="/images/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={styles.title}>Unautorized</h2>{' '}
        {/*Change later for something less scarry */}
        <p className={styles.descr}>
          Please log in or register to access your account.
        </p>
        <div className={styles.navBlock}>
          <NavLink
            to="auth/login"
            onClick={onClick}
            className={styles.loginNavButton}
          >
            Log in
          </NavLink>
          <NavLink
            to="auth/register"
            onClick={onClick}
            className={styles.registerNavButton}
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
});
