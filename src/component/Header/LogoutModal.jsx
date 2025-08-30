import css from './LogoutModal.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';

export const LogoutModal = ({ onCancel, onConfirm, isOpen }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className={clsx(css.overlay, { [css.open]: isOpen })}
      onClick={handleOverlayClick}
    >
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onCancel}>
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <p className={css.title}>Are you shure?</p>
        <p className={css.subtitle}>We will miss you!</p>
        <div className={css.btnWrapper}>
          <button className={css.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={css.logoutBtn} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
