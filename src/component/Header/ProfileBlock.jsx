import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { getUserData } from '../../redux/auth/selectors';

export const ProfileBlock = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const firstName = user.name.split(' ')[0] || 'User';
  const firstLetter = firstName[0].toUpperCase();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <ul className={css.profileList}>
      <li>
        <Link to="/">Recipes</Link>
      </li>
      <li>
        <Link to="profile">My Profile</Link>
      </li>
      <li>
        <div>{firstLetter}</div>
        <span>{firstName}</span>
              <button type="button" onClick={handleLogout}>
                  <svg width="" height="">
                   <use href=""></use>
                  </svg>
        </button>
      </li>
      <li>
        <Link to="add-recipe">Add Recipes</Link>
      </li>
    </ul>
  );
};
