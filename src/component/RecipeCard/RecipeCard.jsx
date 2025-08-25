import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RecipeCard.module.css';
import sprite from '../../images/icons.svg';

const RecipeCard = ({
  recipe,
  isAuthenticated,
  onToggleFavorite,
  isFavorite,
  onOpenAuthModal,
}) => {
  const navigate = useNavigate();
  const handleLearnMoreClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }

    try {
      await onToggleFavorite(recipe._id, !isFavorite);
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
            <svg className={css.cardTimeIcon} aria-label="Time">
              <use href={`${sprite}#icon-clock`} />
            </svg>
            <span>{recipe.time} min</span>
          </div>
        </div>
        <p className={css.cardDescription}>{recipe.description}</p>
        <div className={css.cardInfo}>
          <p className={css.cardCalories}>
            {recipe.calories ? `${recipe.calories} calories` : '—'}
          </p>
        </div>
        <div className={css.cardActions}>
          <button className={css.learnMoreBtn} onClick={handleLearnMoreClick}>
            Learn more
          </button>
          <button
            className={`${css.favoriteBtn} ${
              isFavorite ? css.favoriteBtnActive : ''
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <svg className={css.favoriteIcon} aria-label="Favorite">
              <use href={`${sprite}#icon-bookmark`} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
