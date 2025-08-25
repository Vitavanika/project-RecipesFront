import css from './Header.module.css';
// import { useSelector } from 'react-redux';

// import { getIsLoggedIn } from '../../redux/auth/selectors';

export const Header = () => {
//   const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.logoContainer}>
        <svg className={css.logoIcon} width="32" height="30">
          <use href="/src/images/icons.svg#icon-Group-6884"></use>
        </svg>
        <p className={css.logoTitle}>Tasteorama</p>
      </div>
      <button className={css.burgerBtn}>
        <svg className={css.burgerIcon} width="20" height="14">
          <use href="/src/images/icons.svg#icon-burger-regular"></use>
        </svg>
      </button>
    </header>
  );
}
