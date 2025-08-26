import css from './Header.module.css';

import { useState } from "react";
import { Logo } from "./Logo";
import { BurgerButton } from "./BurgerButton";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
      <header className={css.header}>
        <div className={css.headerWrapper}>
            <Logo />
            <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
        {isMenuOpen && <MobileMenu onClose={closeMenu} />}
      </header>
    );
}
