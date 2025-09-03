import { forwardRef } from 'react';
import { NavLink } from 'react-router';

import styles from './AddRecipeModal.module.css';

export const AddRecipeModal = forwardRef(({ onClick, recipeId }, ref) => {
  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.container}>
        <button onClick={onClick} className={styles.closeModalButton}>
          <svg className={styles.closeIcon} width="24" height="24">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={styles.title}>Done! Recipe saved</h2>{' '}
        <p className={styles.descr}>You can find recipe in our profile</p>
        <div className={styles.navBlock}>
          <NavLink
            to={`/recipes/${recipeId}`}
            onClick={onClick}
            className={styles.loginNavButton}
          >
            Check Recipe
          </NavLink>
          <NavLink
            to="/profile/own"
            onClick={onClick}
            className={styles.registerNavButton}
          >
            Go to My profile
          </NavLink>
        </div>
      </div>
    </div>
  );
});
