import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const currentHasFetched = hasFetched.current;
    
    // Не запускаємо, якщо користувач не авторизований
    if (!isLoggedIn) {
      // Очищаємо прапорець при вилогіні
      if (currentHasFetched[variant]) {
        delete currentHasFetched[variant];
      }
      return;
    }

    // Завантажуємо лише один раз для поточного варіанту
    if (!currentHasFetched[variant] && !isLoading && items.length === 0 && !error) {
      currentHasFetched[variant] = true;
      
      switch (variant) {
        case 'own':
          dispatch(fetchOwnRecipes());
          break;
        case 'favorites':
          dispatch(fetchFavRecipes());
          break;
        default:
          // Завантаження public recipes відбувається в іншому місці
          break;
      }
    }

    // Cleanup функція
    return () => {
      if (currentHasFetched[variant]) {
        delete currentHasFetched[variant];
      }
    };
  }, [variant, isLoggedIn, dispatch, isLoading, items.length, error]);

  if (isLoading && !items.length) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        <span className={styles.spinner} /> Loading…
      </div>
    );
  }

  if (error && !items.length) {
    return <div className={styles.error}>⚠️ {String(error)}</div>;
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

  // Показуємо кнопку Load More тільки якщо є достатньо елементів
  const shouldShowLoadMore = isNextpage && uniqueItems.length > 0 && uniqueItems.length >= 6;

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
      {shouldShowLoadMore && <LoadMoreBtn />}
    </div>
  );
}