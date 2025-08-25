import css from "./NavMenu.module.css";

import { Link } from "react-router";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/selectors";
import { ProfileBlock } from "./ProfileBlock";

export const NavMenu = ({onClose}) => {
  const isAuth = useSelector(getIsLoggedIn);

  if (!isAuth) {
    return (
      <ul className={css.menuList}>
        <li>
          <Link to="/" onClick={onClose}>
            Recipes
          </Link>
        </li>
        <li>
          <Link to="auth/login" onClick={onClose}>
            Log in
          </Link>
        </li>
        <li>
          <Link to="auth/register" onClick={onClose}>
            Register
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className={css.navMenuList}>
      <li>
        <Link to="/" onClick={onClose}>
          Recipes
        </Link>
      </li>
      <li>
        <Link to="profile/:recipeType" onClick={onClose}>
          My Profile
        </Link>
      </li>
      <li>
        <ProfileBlock onClose={onClose} />
      </li>
      <li>
        <Link to="add-recipe" onClick={onClose}>
          Add Recipes
        </Link>
      </li>
    </ul>
  );
};
