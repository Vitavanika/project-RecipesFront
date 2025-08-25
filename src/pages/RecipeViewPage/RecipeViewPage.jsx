import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecipeDetails from "../../component/RecipeDetails/RecipeDetails";
import NotFound from "../../component/NotFound/NotFound";
import axios from "axios";

export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    
    const fetchRecipe = async () => {
     try {
        const [ingredientsResponse, recipeResponse] = await Promise.all([
          axios.get('https://project-recipesback.onrender.com/api/ingredients'),
          axios.get(`https://project-recipesback.onrender.com/api/recipes/${recipeId}`)
        ]);

        const ingredientsMap = {};
        ingredientsResponse.data.forEach(ingredient => {
          ingredientsMap[ingredient._id] = ingredient.name;
        });

        setIngredients(ingredientsMap);
        setRecipe(recipeResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
    };}

    fetchRecipe();
  }, [recipeId]);

  if (error) return <NotFound />;
  if (!recipe) return <p>Loading...</p>;

  return <RecipeDetails recipe={recipe} ingredientsMap={ingredients}/>;
}


