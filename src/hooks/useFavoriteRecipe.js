import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggleFavoriteRecipe } from '../redux/recipes/operations';
import { getIsLoggedIn, getUserData } from '../redux/auth/selectors';

export const useFavoriteRecipe = recipeId => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsLoggedIn);
  const userData = useSelector(getUserData);
  const favorites = userData?.favorites || [];
  const saved = favorites.includes(recipeId);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSave = async (onAuthRequired = () => setShowAuthModal(true)) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    try {
      setIsLoading(true);

      const result = await dispatch(
        toggleFavoriteRecipe({ recipeId, isFavorite: saved })
      ).unwrap();

      toast.success(
        result.isFavorite
          ? 'Recipe added to favorites'
          : 'Recipe removed from favorites'
      );

      return result.isFavorite;
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saved,
    isLoading,
    showAuthModal,
    setShowAuthModal,
    toggleSave,
  };
};
