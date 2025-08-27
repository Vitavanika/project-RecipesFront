import css from './Header.module.css';

import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BurgerButton } from './BurgerButton';
import { MobileMenu } from './MobileMenu';
import { NavMenu } from './NavMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isMobile = windowWidth < 768;
  const isTabletDesktop = windowWidth >= 768;

  return (
    <header className={css.header}>
      <div className={css.headerWrapper}>
        <Logo />
        {isMobile && <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />}

        {isTabletDesktop && (
          <nav>
            <NavMenu layout="tablet-desktop" />
          </nav>
        )}
      </div>
      {isMobile && isMenuOpen && <MobileMenu onClose={closeMenu} />}
    </header>
  );
};
