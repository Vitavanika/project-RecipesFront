import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import css from './RecipeCard.module.css';
import { toggleFavoriteRecipe } from '../../redux/recipes/operations';
import { AuthModal } from '../AuthModal/AuthModal';
import { getIsLoggedIn } from '../../redux/auth/selectors';

const RecipeCard = ({
  recipe,
  onLearnMore,
  onToggleFavorite,
  onOpenAuthModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const isAuthenticated = useSelector(getIsLoggedIn);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLearnMoreClick = () => {
    if (onLearnMore) {
      onLearnMore(recipe);
    } else {
      navigate(`/recipes/${recipe._id}`);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      if (onOpenAuthModal) {
        onOpenAuthModal();
      } else {
        setShowAuthModal(true);
      }
      return;
    }

   try {
      setLoading(true);
      if (onToggleFavorite) {
        await onToggleFavorite(recipe);
      } else {
        const result = await dispatch(
          toggleFavoriteRecipe({
            recipeId: recipe._id,
            isFavorite: recipe.isFavorite,
          })
        ).unwrap();

        toast.success(
          result.isFavorite
            ? 'Recipe added to favorites'
            : 'Recipe removed from favorites'
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.card}>
        <img src={recipe.thumb} alt={recipe.title} className={css.cardImage} />
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>{recipe.title}</h3>
          <div className={css.cardTime}>
            <svg className={css.cardTimeIcon}  width="16"
              height="16" >
              <use href="/sprite.svg#icon-clock" />
            </svg>
            <span>{recipe.time}</span>
          </div>
        </div>
        <p className={css.cardDescription}>{recipe.description}</p>
        <p className={css.cardCaloris}>~{recipe.foodEnergy} cals</p>

        <div className={css.cardActions}>
          <button type="button" className={css.learnMoreBtn} onClick={handleLearnMoreClick}>
            Learn more
          </button>
          <button
          type="button"
            onClick={handleFavoriteClick}
            className={css.favoriteBtn}
            disabled={loading}
            aria-label={
              recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <svg
              width="15"
              height="17"
              className={recipe.isFavorite ? css.unsaveIcon : css.saveIcon}
            >
              <use href="/sprite.svg#icon-bookmark"></use>
            </svg>
          </button>
        </div>


      {showAuthModal && (
        <AuthModal onClick={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default RecipeCard;
