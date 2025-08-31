import css from "./NavMenu.module.css";
import clsx from "clsx";

import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/selectors";
import { ProfileBlock } from "./ProfileBlock";

const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export const NavMenu = ({ onClose, layout }) => {
  const isAuth = useSelector(getIsLoggedIn);
  const location = useLocation();

  const items = {
    recipes: <NavLink to="/" className={buildLinkClass} onClick={onClose}>Recipes</NavLink>,
    myProfile: <NavLink to="profile/own" className={() => clsx(css.link, location.pathname.startsWith("/profile") && css.active)} onClick={onClose}>My Profile</NavLink>,
    addRecipes: <NavLink className={css.item} to="add-recipe" onClick={onClose}>Add Recipes</NavLink>,
    profileBlock: <ProfileBlock onClose={onClose} />,
    login: <NavLink to="auth/login" className={buildLinkClass} onClick={onClose}>Log in</NavLink>,
    register: <NavLink to="auth/register" className={css.item} onClick={onClose}>Register</NavLink>,
  };

  const order = isAuth
    ? layout === "tablet-desktop"
      ? ["recipes", "myProfile", "addRecipes", "profileBlock"]
      : ["recipes", "myProfile", "profileBlock", "addRecipes"]
    : ["recipes", "login", "register"];

  return (
    <ul className={css.menuList}>
      {order.map(key => (
        <li key={key}>{items[key]}</li>
      ))}
    </ul>
  );
};
