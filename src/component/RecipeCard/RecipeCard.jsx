import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import css from './RecipeCard.module.css';
import { toggleFavoriteRecipe } from '../../redux/recipes/operations';
import { AuthNavModal } from '../AuthNavModal/AuthNavModal';

const RecipeCard = ({ recipe, isAuthenticated, isFavorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLearnMoreClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        toggleFavoriteRecipe({ recipeId: recipe._id, isFavorite })
      ).unwrap();
      toast.success(
        isFavorite
          ? 'Recipe removed from favorites'
          : 'Recipe added to favorites'
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.card}>
        <img src={recipe.image} alt={recipe.title} className={css.cardImage} />
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
          <button className={css.learnMoreBtn} onClick={handleLearnMoreClick}>
            Learn more
          </button>
          <button
            onClick={handleFavoriteClick}
            className={css.favoriteBtn}
            disabled={loading}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <svg
              width="15"
              height="17"
              className={isFavorite ? css.unsaveIcon : css.saveIcon}
            >
              <use href="/sprite.svg#icon-bookmark"></use>
            </svg>
          </button>
        </div>


      {showAuthModal && (
        <AuthNavModal onClick={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default RecipeCard;
