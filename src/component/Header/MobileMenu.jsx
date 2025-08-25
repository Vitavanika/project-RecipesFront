import css from "./MobileMenu.module.css";
import { NavMenu } from "./NavMenu";

export const MobileMenu = ({onClose}) => {
  return (
    <div className={css.menuContainer}>
      <nav>
        <NavMenu onClose={onClose} />
      </nav>
    </div>
  );
};