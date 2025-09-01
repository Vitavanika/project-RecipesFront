import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggleFavoriteRecipe } from '../redux/recipes/operations';
import { getIsLoggedIn } from '../redux/auth/selectors';
import { selectFavLoading, selectFavRecipes } from "../redux/recipes/selectors";

export const useFavoriteRecipe = (recipeId) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsLoggedIn);
  const isLoading = useSelector(selectFavLoading);
  const favorites = useSelector(selectFavRecipes);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const savedInRedux = favorites.some(f => f._id === recipeId);
  const [localSaved, setLocalSaved] = useState(savedInRedux);

  useEffect(() => {
    setLocalSaved(savedInRedux);
  }, [savedInRedux]);

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
          isFavorite: localSaved,
        })
      ).unwrap();

      toast.success(
        result.isFavorite
          ? "Recipe added to favorites"
          : "Recipe removed from favorites"
      );

      setLocalSaved(result.isFavorite);
      return result.isFavorite;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return {
    saved: localSaved,
    isLoading,
    showAuthModal,
    setShowAuthModal,
    toggleSave,
  };
};
