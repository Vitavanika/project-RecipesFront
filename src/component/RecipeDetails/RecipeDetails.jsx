import RecipeImage from "../RecipeImage/RecipeImage";
import RecipeGeneralInfo from "../RecipeGeneralInfo/RecipeGeneralInfo";
import RecipeContent from "../RecipeContent/RecipeContent";
import css from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe, ingredientsMap }) {

  return (
    <div className={css.container}>
       <RecipeImage src={recipe.thumb} alt={recipe.title} />
      <h2 className={css.title}>{recipe.title}</h2>
      <div className={css.wrapper}>
        <RecipeGeneralInfo
          category={recipe.category || "Unknown"}
          cookingTime={recipe.time}
          calories={recipe.foodEnergy}
          recipeId={recipe._id}
          isAuthenticated={false} 
          onRequireAuth={() => alert("You need to log in to save recipes")}
        />
        <RecipeContent
          about={recipe.description}
          ingredients={recipe.ingredients}
          ingredientsMap={ingredientsMap}
          steps={recipe.instructions}
        />
      </div>
    </div>
  );
}
