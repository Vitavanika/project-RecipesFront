import RecipeImage from "../RecipeImage/RecipeImage";
import RecipeGeneralInfo from "../RecipeGeneralInfo/RecipeGeneralInfo";
import RecipeContent from "../RecipeContent/RecipeContent";
import css from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe }) {

  return (
    <div className={css.container}>
       <RecipeImage src={recipe.photo} alt={recipe.name} />
      <h2 className={css.title}>{recipe.name}</h2>
      <div className={css.wrapper}>
        <RecipeGeneralInfo
          category={recipe.category || "Unknown"}
          cookingTime={recipe.cookingTime}
          calories={recipe.foodEnergy}
          recipeId={recipe._id}
          />
        <RecipeContent
          about={recipe.description}
          ingredients={recipe.ingredients}
          steps={recipe.instructions}
        />
      </div>
    </div>
  );
}
