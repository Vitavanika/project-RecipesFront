import { forwardRef } from 'react';
import { NavLink } from 'react-router';
import css  from './AuthModal.module.css'

export const AuthModal = forwardRef(
  ({ onClick }, ref) => {
    return (
      <div className={css.overlay}>
        <div ref={ref} className={css.container}>
          <button onClick={onClick} className={css.closeModalButton}>
            <svg className={css.closeIcon} width="24" height="24">
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
          <h2 className={css.title}>Error while saving</h2>{' '}
          <p className={css.descr}>To save this recipe, you need to  <br /> authorize first</p>
          <div className={css.navBlock}>
            <NavLink
              to="/auth/login"
              onClick={onClick}
              className={css.loginNavButton}
            >
              Log in
            </NavLink>
            <NavLink
              to="/auth/register"
              onClick={onClick}
              className={css.registerNavButton}
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
);
