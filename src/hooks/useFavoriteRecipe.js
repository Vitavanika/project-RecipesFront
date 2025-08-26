import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export const useFavoriteRecipe = (recipeId, initialSaved = false) => {
  const { isAuthenticated } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  const toggleSave = async (onRequireAuth) => {
    if (!isAuthenticated) {
      if (onRequireAuth) onRequireAuth();
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/favorites/${recipeId}`, {
        method: saved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update favorites');

      setSaved(!saved);
      toast.success(
        saved ? 'Recipe removed from favorites' : 'Recipe added to favorites'
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