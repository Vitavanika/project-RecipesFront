import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecipeDetails from "../../component/RecipeDetails/RecipeDetails";
import NotFound from "../../component/NotFound/NotFound";
import axios from "axios";

export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState();
   const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    
    const fetchRecipe = async () => {

       setIsLoading(true);
      setError(false);

     try {
        const recipeResponse = await axios.get(`https://project-recipesback.onrender.com/api/recipes/${recipeId}`);

        const ingredientIds = recipeResponse.data.data.ingredients.map(ingredient => ingredient.id);

        const ingredientsResponse = await axios.get('https://project-recipesback.onrender.com/api/ingredients', { params: { ids: ingredientIds.join(',') }})

        const ingredientsMap = {};
        ingredientsResponse.data.forEach(ingredient => {
          ingredientsMap[ingredient._id] = ingredient.name;
        });

        setIngredients(ingredientsMap);
        setRecipe(recipeResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
    } finally {
        setIsLoading(false);
      };}

    fetchRecipe();
  }, [recipeId]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !recipe) return <NotFound />;
  
  return <RecipeDetails recipe={recipe} ingredientsMap={ingredients}/>;
}


