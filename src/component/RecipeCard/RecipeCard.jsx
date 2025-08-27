import React from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import css from './RecipeCard.module.css';

const RecipeCard = ({
  recipe,
  isAuthenticated,
  onToggleFavorite,
  isFavorite,
  onOpenAuthModal,
}) => {
  console.log('🚀 ~ RecipeCard ~ recipe:', recipe);
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
      toast.success(
        isFavorite ? 'Рецепт видалено з обраного' : 'Рецепт додано до обраного'
      );
    } catch (error) {
      toast.error('Помилка при оновленні обраного. Спробуйте пізніше.');
    }
  };

  return (
    <div className={css.card}>
      <div className={css.cardImageContainer}>
        {recipe.thumb ?? (
          <img
            src={recipe.thumb}
            alt={recipe.title}
            className={css.cardImage}
          />
        )}
      </div>
      <div className={css.cardContent}>
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>{recipe.title}</h3>
          <div className={css.cardTime}>
            <svg className={css.cardTimeIcon} aria-label="Time">
              <use href="/sprite.svg#icon-clock" />
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
              <use href="/sprite.svg#icon-bookmark" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
