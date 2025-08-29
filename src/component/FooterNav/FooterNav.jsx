import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';
import { getIsLoggedIn } from '../../redux/auth/selectors';
import styles from './FooterNav.module.css';
import { openAuthNavModal } from '../../redux/misc/slice';

export const FooterNav = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const location = useLocation();
  const isLoggingIn = /register|login/i.test(location.pathname);

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(
      openAuthNavModal({
        title: 'Unautorized',
        description: 'Please log in or register to access your account.',
      })
    );
  };

  return (
    <>
      <ul className={styles.footerNavContainer}>
        <li>
          <NavLink to="/" className={styles.link}>
            Recipes
          </NavLink>
        </li>
        {!isLoggingIn && !isLoggedIn && (
          <li>
            <button className={styles.link} onClick={openModal}>
              Account
            </button>
          </li>
        )}
        {isLoggedIn && (
          <NavLink to="/profile/own" className={styles.link}>
            Account
          </NavLink>
        )}
      </ul>
    </>
  );
};
