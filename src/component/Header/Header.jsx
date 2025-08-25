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
        <Logo />
        <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        {isMenuOpen && <MobileMenu onclose={closeMenu} />}
      </header>
    );
}
