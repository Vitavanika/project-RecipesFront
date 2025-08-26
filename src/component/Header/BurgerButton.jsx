import css from "./BurgerButton.module.css";

export const BurgerButton = ({ isOpen, onClick }) => {
    return (
      <button type="button" onClick={onClick} aria-label="Menu toggle">
        {isOpen ? (
          <svg className={css.closeIcon} width="20" height="14">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        ) : (
          <svg className={css.openIcon} width="20" height="14">
            <use href="/sprite.svg#icon-burger-regular"></use>
          </svg>
        )}
      </button>
    );

}
    
