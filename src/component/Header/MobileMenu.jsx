import css from "./MobileMenu.module.css";
import { NavMenu } from "./NavMenu";

export const MobileMenu = () => {
    return (
        <div className={css.menuContainer}>
            <nav >
                <NavMenu />
            </nav>
        </div>
    );
};