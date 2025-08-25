import { useState, useEffect } from "react";
import css from "./RecipeGeneralInfo.module.css";

export default function RecipeGeneralInfo({
  category,
  cookingTime,
  calories,
  isAuthenticated,
  recipeId,
  onRequireAuth,
   initialIsSaved = false,
}) {
  const [saved, setSaved] = useState(initialIsSaved);

   useEffect(() => {
    setSaved(initialIsSaved);
  }, [initialIsSaved]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    try {
      const response = await fetch(`/api/favorites/${recipeId}`, {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update favorites");

      setSaved(!saved);

       alert( saved
          ? "Recipe removed from favorites"
          : "Recipe added to favorites",
      );
    } catch (error) {
       alert({
        message: error.message,
      });
    }
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

      <button onClick={handleToggleSave} className={css.button}>
        {saved ? "Unsave" : "Save"}
        <svg
          width="15"
          height="17"
          className={saved ? css.unsaveIcon : css.saveIcon}
        >
          <use href="/src/images/icons.svg#icon-bookmark"></use>
        </svg>
      </button>
    </div>
  );
}
