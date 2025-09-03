import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipesList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { hasNextPage } from '../../redux/recipes/selectors';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations';
import { getIsLoggedIn } from '../../redux/auth/selectors';
import NoRecipesFound from '../NoRecipiesFound/NoRecipesFound';

export default function RecipesList({
  variant,
  onLearnMore,
  onToggleFavorite,
  onDelete,
  onOpenAuthModal,
  isAuthenticated = false,
}) {
  const hasFetched = useRef({});
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);

  const items = useSelector(s => {
    switch (variant) {
      case 'favorites':
        return s?.recipes?.favorites?.items ?? [];
      case 'own':
        return s?.recipes?.own?.items ?? [];
      default:
        return s?.recipes?.filteredRecipes?.hits ?? [];
    }
  });

  const isLoading = useSelector(s => {
    switch (variant) {
      case 'favorites':
        return !!s?.recipes?.favorites?.isLoading;
      case 'own':
        return !!s?.recipes?.own?.isLoading;
      default:
        return !!s?.recipes?.filteredRecipes?.isLoading;
    }
  });

  const error = useSelector(s => {
    switch (variant) {
      case 'favorites':
        return s?.recipes?.favorites?.error ?? '';
      case 'own':
        return s?.recipes?.own?.error ?? '';
      default:
        return s?.recipes?.filteredRecipes?.error ?? '';
    }
  });

  const isNextpage = useSelector(s => {
    switch (variant) {
      case 'favorites':
        return s?.recipes?.favorites?.hasNextPage ?? false;
      case 'own':
        return s?.recipes?.own?.hasNextPage ?? false;
      default:
        return hasNextPage(s);
    }
  });

  const shouldFetch = useMemo(() => {
    return (
      !hasFetched.current[variant] &&
      !isLoading &&
      !error &&
      items.length === 0 &&
      isLoggedIn
    );
  }, [variant, isLoading, error, items.length, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (
      variant === 'favorites' &&
      !hasFetched.current[variant] &&
      !isLoading &&
      !error &&
      items.length === 0
    ) {
      hasFetched.current[variant] = true;
      return;
    }

    if (shouldFetch) {
      hasFetched.current[variant] = true;
      switch (variant) {
        case 'own':
          dispatch(fetchOwnRecipes());
          break;
        case 'favorites':
          dispatch(fetchFavRecipes());
          break;
      }
    }
  }, [
    shouldFetch,
    dispatch,
    variant,
    isLoggedIn,
    isLoading,
    error,
    items.length,
  ]);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    if (hasFetched.current[variant]) {
      delete hasFetched.current[variant];
    }
    
    switch (variant) {
      case 'own':
        dispatch(fetchOwnRecipes());
        break;
      case 'favorites':
        dispatch(fetchFavRecipes());
        break;
    }
  }, [variant, isLoggedIn, dispatch]);

  useEffect(() => {
    const currentHasFetched = hasFetched.current;

    return () => {
      if (currentHasFetched[variant]) {
        delete currentHasFetched[variant];
      }
    };
  }, [variant]);

  if (isLoading && !items.length) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        <span className={styles.spinner} /> Loading…
      </div>
    );
  }

  if (error && !items.length) {
    return <div className={styles.error}>⚠ {String(error)}</div>;
  }

  if (!items.length && !isLoading) {
    if (variant === 'public') {
      return <NoRecipesFound />;
    }
    
    if (variant === 'favorites' || variant === 'own') {
      const emptyMessage = variant === 'favorites' 
        ? "You don't have any saved recipes yet. Add some by clicking the save button."
        : "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";
      
      return (
        <div className={styles.emptyMessage}>
          {emptyMessage}
        </div>
      );
    }
  }

  const uniqueItems = items.filter(
    (recipe, index, self) => index === self.findIndex(r => r._id === recipe._id)
  );

  return (
    <div
      className={`${styles.wrap} ${
        uniqueItems.length === 1 ? styles['single-item'] : ''
      }`}
    >
      {uniqueItems.map(r => (
        <RecipeCard
          key={r._id || r.id}
          recipe={r}
          variant={variant}
          isAuthenticated={isAuthenticated}
          onLearnMore={onLearnMore}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onOpenAuthModal={onOpenAuthModal}
          disabled={r._pending === true}
        />
      ))}
      {/* Only show LoadMoreBtn if there are actually more pages AND we have items */}
      {isNextpage && uniqueItems.length > 0 && <LoadMoreBtn />}
    </div>
  );
}