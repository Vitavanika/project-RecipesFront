import { Link } from "react-router";
import css from './Logo.module.css';

export const Logo = () => {
    return (
      <Link className={css.container} to="/">
        <svg className={css.logoIcon} width="32" height="30">
          <use href="/src/images/icons.svg#icon-Group-6884"></use>
        </svg>
        <p className={css.logoTitle}>Tasteorama</p>
      </Link>
    );
};