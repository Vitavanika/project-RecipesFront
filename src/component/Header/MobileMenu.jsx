import css from "./MobileMenu.module.css";
import { NavMenu } from "./NavMenu";

export const MobileMenu = ({ onClose, layout }) => {
  return (
    <div className={css.menuContainer}>
      <nav>
        <NavMenu onClose={onClose} layout={layout} />
      </nav>
    </div>
  );
};