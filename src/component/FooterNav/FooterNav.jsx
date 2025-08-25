import { useRef, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, useLocation } from 'react-router';
import { getIsLoggedIn } from '../../redux/auth/selectors';
import { AuthNavModal } from '../AuthNavModal/AuthNavModal';
import styles from './FooterNav.module.css';

export const FooterNav = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const location = useLocation();
  const isLoggingIn = /register|login/i.test(location.pathname);
  const modalRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModalState = useCallback(() => setIsModalOpen(prev => !prev), []);

  useEffect(() => {
    const handleClick = event => {
      if (
        modalRef.current &&
        event.target &&
        !modalRef.current.contains(event.target)
      ) {
        toggleModalState();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      console.log('removing event listener');
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isModalOpen, toggleModalState]);

  return (
    <>
      <ul className={styles.container}>
        <li>
          <NavLink to="/" className={styles.link}>
            Recipes
          </NavLink>
        </li>
        {!isLoggingIn && (
          <li>
            <p className={styles.link} onClick={toggleModalState}>
              Account
            </p>
          </li>
        )}
        {isLoggedIn && (
          <NavLink to="profile" className={styles.link}>
            Account
          </NavLink>
        )}
      </ul>
      {isModalOpen && (
        <AuthNavModal ref={modalRef} onClick={toggleModalState} />
      )}
    </>
  );
};
