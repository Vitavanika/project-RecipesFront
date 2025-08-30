import css from "./MobileMenu.module.css";
import { NavMenu } from "./NavMenu";
import clsx from "clsx";

export const MobileMenu = ({ onClose, isOpen }) => {
  return (
    <div className={clsx(css.menuContainer, { [css.open]: isOpen })}>
      <nav>
        <NavMenu onClose={onClose} />
      </nav>
    </div>
  );
};
