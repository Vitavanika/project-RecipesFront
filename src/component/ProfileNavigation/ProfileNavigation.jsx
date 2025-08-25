import { NavLink } from "react-router";
import css from "./ProfileNavigation.module.css";
import clsx from 'clsx';


export default function ProfileNavigation () {
     const buildLinkClass = ({ isActive }) => clsx(css.navLink, { [css.activeLink]: isActive });
    return <div className={css.navContainer}>
        <NavLink to="own" className={buildLinkClass}>My recipes</NavLink>
        <NavLink to="favorites" className={buildLinkClass}>Saved recipes</NavLink>
    </div>
}