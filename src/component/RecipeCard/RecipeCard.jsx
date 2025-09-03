import { useNavigate } from "react-router";
import { AuthModal } from "../AuthModal/AuthModal";
import { useFavoriteRecipe } from "../../hooks/useFavoriteRecipe";
import css from "./RecipeCard.module.css";

const RecipeCard = ({
  recipe, variant, onLearnMore
}) => {
  const {
    saved,
    isLoading,
    showAuthModal,
    setShowAuthModal,
    toggleSave,
  } = useFavoriteRecipe(recipe._id, variant === "favorites");

const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    if (onLearnMore) {
      onLearnMore(recipe);
    } else {
      navigate(`/recipes/${recipe._id}`);
    }
  };

  return (
    <div className={css.card}>
        <img src={recipe.photo} alt={recipe.title} className={css.cardImage} />
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>{recipe.name}</h3>
          <div className={css.cardTime}>
            <svg className={css.cardTimeIcon}  width="16"
              height="16" >
              <use href="/sprite.svg#icon-clock" />
            </svg>
            <span>{recipe.cookingTime}</span>
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
          onClick={() => toggleSave(() => setShowAuthModal(true))}
          className={css.favoriteBtn}
          disabled={isLoading}
          aria-label={saved ? "Remove from favorites" : "Add to favorites"}
        >
            <svg
              width="15"
              height="17"
              className={saved ? css.unsaveIcon : css.saveIcon}
            >
              <use href="/sprite.svg#icon-bookmark"></use>
            </svg>
          </button>
        </div>


      {showAuthModal && <AuthModal onClick={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default RecipeCard;

