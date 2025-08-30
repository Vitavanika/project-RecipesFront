import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggleFavoriteRecipe } from '../redux/recipes/operations';
import { getIsLoggedIn } from '../redux/auth/selectors';
import { selectFavLoading } from "../redux/recipes/selectors";

export const useFavoriteRecipe = (recipeId, initialSaved = false) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsLoggedIn);
  const isLoading = useSelector(selectFavLoading);

  const [saved, setSaved] = useState(initialSaved);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleSave = async (onAuthRequired) => {
    if (!isAuthenticated) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        setShowAuthModal(true);
      }
      return;
    }

    try {
      const result = await dispatch(
        toggleFavoriteRecipe({
          recipeId,
          isFavorite: saved,
        })
      ).unwrap();

      setSaved(result.isFavorite);

      toast.success(
        result.isFavorite
          ? "Recipe added to favorites"
          : "Recipe removed from favorites"
      );

      return result.isFavorite;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };


  return {
    saved,
    isLoading,
    showAuthModal,
    setShowAuthModal,
    toggleSave,
  };
}
