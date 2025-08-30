import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggleFavoriteRecipe } from '../redux/recipes/operations';
import { getIsLoggedIn } from '../redux/auth/selectors';

export const useFavoriteRecipe = (recipeId, initialSaved = false) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsLoggedIn);

  const [saved, setSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSave = async (onRequireAuth) => {
    if (!isAuthenticated) {
      if (onRequireAuth) onRequireAuth();
      return false;
    }

    try {
      setIsLoading(true);

      const result = await dispatch(
        toggleFavoriteRecipe({
          recipeId,
          isFavorite: saved, 
        })
      ).unwrap();

      setSaved(result.isFavorite);

      toast.success(
        result.isFavorite
          ? 'Recipe added to favorites'
          : 'Recipe removed from favorites'
      );

      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { saved, isLoading, toggleSave };
};
