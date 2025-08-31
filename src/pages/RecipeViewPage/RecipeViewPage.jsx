import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeById } from "../../redux/recipes/operations";
import RecipeDetails from "../../component/RecipeDetails/RecipeDetails";
import NotFound from "../../component/NotFound/NotFound";
import Loader from "../../component/Loader/Loader";


export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const { recipe, isLoading, error } = useSelector(state => state.recipes.current);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }
  }, [dispatch, recipeId]);

if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!recipe) {
    return <Loader />; 
  }

  return <RecipeDetails recipe={recipe} />;
}