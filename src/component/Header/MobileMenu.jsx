import css from "./MobileMenu.module.css";

import { useState } from "react";
import { Logo } from "./Logo";
import { BurgerButton } from "./BurgerButton";

export const MobileMenu = ({ onClose }) => {
    const [isOpen] = useState(true);

    return (
        <div>
            <header className={css.header}>
                <Logo />
                <BurgerButton isOpen={isOpen} onClick={onClose} />
            </header>
            <nav>
                <p>NavMenu</p>
            </nav>
        </div>
    );
};