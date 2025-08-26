import css from './ProfileBlock.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { getUserData } from '../../redux/auth/selectors';

export const ProfileBlock = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const firstName = user?.name?.split(' ')[0] || 'User';
  const firstLetter = firstName[0]?.toUpperCase() || 'U';

  const handleLogout = () => {
    dispatch(logOut());
    if (onClose) onClose();
  };

  return (
    <div className={css.profileContainer}>
      <div className={css.firstLetter}>{firstLetter}</div>
      <span>{firstName}</span>
      <div className={css.vertLine}></div>
      <button type="button" onClick={handleLogout}>
        <svg className={css.logOutIcon} width="24" height="24">
          <use href="/sprite.svg#icon-log-out"></use>
        </svg>
      </button>
    </div>
  );
};
