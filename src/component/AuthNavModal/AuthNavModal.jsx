import { forwardRef } from 'react';
import { NavLink } from 'react-router';

import styles from './AuthNavModal.module.css';
import { useSelector } from 'react-redux';
import { selectAuthNavModalData } from '../../redux/misc/selectors';

export const AuthNavModal = forwardRef(({ onClick }, ref) => {
  const data = useSelector(selectAuthNavModalData);
  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.container}>
        <button onClick={onClick} className={styles.closeModalButton}>
          <svg className={styles.closeIcon} width="24" height="24">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={styles.title}>{data.title}</h2>
        {/*Change later for something less scarry */}
        <p className={styles.descr}>{data.description}</p>
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
