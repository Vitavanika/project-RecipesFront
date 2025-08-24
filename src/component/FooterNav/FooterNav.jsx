import { useRef, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';
import { selectIsLoggedIn } from 'store';
import { AuthNavModal } from '../AuthNavModal/AuthNavModal';

export const FooterNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggingIn = useLocation.pathname.contains('register', 'login');
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
    <div>
      <ul>
        <li>
          <NavLink to="/">Recipes</NavLink>
        </li>
        {!isLoggingIn && (
          <li>
            <p onClick={toggleModalState}>Account</p>
          </li>
        )}
        {isLoggedIn && <NavLink to="profile">Account</NavLink>}
      </ul>
      {isModalOpen && (
        <AuthNavModal ref={modalRef} onClick={toggleModalState} />
      )}
    </div>
  );
};
