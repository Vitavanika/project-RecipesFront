import React from 'react';
import css from './RecipeCard.module.css';

const RecipeCard = ({
  recipe,
  isAuthenticated,
  onToggleFavorite,
  isFavorite,
  onOpenAuthModal,
}) => {
  const handleLearnMoreClick = () => {
    console.log(`Navigate to /recipes/${recipe._id}`);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // Виклик функції для відкриття модального вікна авторизації
      onOpenAuthModal();
      return;
    }

    // Запит на бекенд для додавання/видалення з обраних
    try {
      await onToggleFavorite(recipe._id, isFavorite);
      // Логіка оновлення стану "обраного" відбудеться після успішного запиту
    } catch (error) {
      console.error('Помилка при оновленні обраного:', error);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.cardImageContainer}>
        <img src={recipe.image} alt={recipe.title} className={css.cardImage} />
      </div>
      <div className={css.cardContent}>
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>{recipe.title}</h3>
          <div className={css.cardTime}>
            <span className={css.cardTimeIcon}>🕐</span>
            <span>{recipe.time}</span>
          </div>
        </div>
        <p className={css.cardDescription}>{recipe.description}</p>
        <p className={css.cardCalories}>
          {recipe.calories ? `${recipe.calories} cals` : '—'}
        </p>
        <div className={css.cardActions}>
          <button className={css.cardButton} onClick={handleLearnMoreClick}>
            Learn more
          </button>
          <button
            className={`${css.cardSaveButton} ${
              isFavorite ? css.isFavorite : ''
            }`}
            onClick={handleFavoriteClick}
          >
            <span className={css.cardSaveIcon}>{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
