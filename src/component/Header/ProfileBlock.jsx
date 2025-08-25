// import css from "./ProfileBlock.module.css";
import { Link } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { getUserData } from "../../redux/auth/selectors";

export const ProfileBlock = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const firstName = user.name.split(" ")[0] || "User";
  const firstLetter = firstName[0].toUpperCase();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
        <div>{firstLetter}</div>
        <span>{firstName}</span>
        <button type="button" onClick={handleLogout}>
            <svg width="" height="">
                <use href=""></use>
            </svg>
        </button>
    </div>

  );
};
