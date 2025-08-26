import { useState } from 'react';
import { useFavoriteRecipe } from '../../hooks/useFavoriteRecipe';
import { AuthNavModal } from '../AuthNavModal/AuthNavModal.jsx';
import css from "./RecipeGeneralInfo.module.css";

export default function RecipeGeneralInfo({
  category,
  cookingTime,
  calories,
  recipeId,
  initialIsSaved = false,
}) {
  const { saved, isLoading, toggleSave } = useFavoriteRecipe(recipeId, initialIsSaved);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleToggleSave = async () => {
    await toggleSave(() => setShowAuthModal(true)); 
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
          <use href="/public/sprite.svg#icon-bookmark"></use>
        </svg>
      </button>
      {showAuthModal && (
        <AuthNavModal onClick={handleCloseModal} />
      )}
    </div>
  );
}

