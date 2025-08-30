import { useState } from 'react';
import { useFavoriteRecipe } from '../../hooks/useFavoriteRecipe';
import { AuthModal } from '../AuthModal/AuthModal';
import toast from "react-hot-toast";
import css from "./RecipeGeneralInfo.module.css";

export default function RecipeGeneralInfo({
  category,
  cookingTime,
  calories,
  recipeId,
  initialIsSaved = false,
}) {
  const { saved, isLoading, toggleSave } = useFavoriteRecipe(
    recipeId,
    initialIsSaved
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleToggleSave = async () => {
    try {
      const result = await toggleSave(() => setShowAuthModal(true));

      if (result !== undefined) {
        toast.success(result ? "Recipe added to favorites" : "Recipe removed from favorites");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h3 className={css.title}>General informations</h3>
        <ul className={css.list}>
          <li className={css.item}>
            <strong>Category:</strong> {category}
          </li>
          <li className={css.item}>
            <strong>Cooking time:</strong> {cookingTime} minutes
          </li>
          <li className={css.item}>
            <strong>Caloric content:</strong> Approximately {calories} kcal per
            serving
          </li>
        </ul>
      </div>

      <button onClick={handleToggleSave} className={css.button} disabled={isLoading}>
        {saved ? "Unsave" : "Save"}
        <svg
          width="15"
          height="17"
          className={saved ? css.unsaveIcon : css.saveIcon}
        >
          <use href="/sprite.svg#icon-bookmark"></use>
        </svg>
      </button>
      {showAuthModal && (
        <AuthModal onClick={handleCloseModal} />
      )}
    </div>
  );
}

