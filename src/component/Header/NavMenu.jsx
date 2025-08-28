import css from "./NavMenu.module.css";

import { Link } from "react-router";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/auth/selectors";
import { ProfileBlock } from "./ProfileBlock";

export const NavMenu = ({ onClose, layout }) => {
  const isAuth = useSelector(getIsLoggedIn);

  const items = {
    recipes: <Link to="/" onClick={onClose}>Recipes</Link>,
    myProfile: <Link to="profile/my-recipes" onClick={onClose}>My Profile</Link>,
    addRecipes: <Link to="add-recipe" onClick={onClose}>Add Recipes</Link>,
    profileBlock: <ProfileBlock onClose={onClose} />,
    login: <Link to="auth/login" onClick={onClose}>Log in</Link>,
    register: <Link to="auth/register" onClick={onClose}>Register</Link>,
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
