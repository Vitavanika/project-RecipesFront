import css from './ProfileBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { logOut } from '../../redux/auth/operations';
import { getUserData } from '../../redux/auth/selectors';
import { LogoutModal } from './LogoutModal';

export const ProfileBlock = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserData);
  const isAuth = useSelector(state => state.auth.isLoggedIn);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  if (!isAuth) return null;

  const firstName = user?.name?.split(' ')[0] || 'User';
  const firstLetter = firstName[0]?.toUpperCase() || 'U';

  const handleLogout = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
    navigate('/');
    if (onClose) onClose();
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <>
      <div className={css.profileContainer}>
        <div className={css.firstLetter}>{firstLetter}</div>
        <span>{firstName}</span>
        <div className={css.vertLine}></div>
        <button type="button" onClick={openLogoutModal}>
          <svg className={css.logOutIcon} width="24" height="24">
            <use href="/sprite.svg#icon-log-out"></use>
          </svg>
        </button>
      </div>

        <LogoutModal
          onCancel={closeLogoutModal}
          onConfirm={handleLogout}
          isOpen={isLogoutModalOpen}
        />
    </>
  );
};
