import css from "./NavMenu.module.css";

import { Link } from "react-router";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/selectors";
import { ProfileBlock } from "./ProfileBlock";

export const NavMenu = () => {
  const isAuth = useSelector(getIsLoggedIn);

  if (!isAuth) {
    return (
      <ul className={css.menuList}>
        <li>
          <Link to="/">Recipes</Link>
        </li>
        <li>
          <Link to="auth/login">Log in</Link>
        </li>
        <li>
          <Link to="auth/register">Register</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className={css.navMenuList}>
      <li>
        <Link to="/">Recipes</Link>
      </li>
      <li>
        <Link to="profile/:recipeType">My Profile</Link>
      </li>
      <li>
        <ProfileBlock />
      </li>
      <li>
        <Link to="add-recipe">Add Recipes</Link>
      </li>
    </ul>
  );
};
