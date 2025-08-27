import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeById } from "../../redux/recipes/operations";
import RecipeDetails from "../../component/RecipeDetails/RecipeDetails";
import NotFound from "../../component/NotFound/NotFound";


export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const { recipe, ingredients } = useSelector(state => state.recipes.current);
  const { loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
  }, [dispatch, recipeId]);

   if (loading) return <p>Loading...</p>;
  if (error || !recipe) return <NotFound />;

  return <RecipeDetails recipe={recipe} ingredientsMap={ingredients} />;
}