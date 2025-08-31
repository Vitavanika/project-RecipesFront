import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipesList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { hasNextPage } from '../../redux/recipes/selectors';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations';

export default function RecipesList({
  variant,
  onLearnMore,
  onToggleFavorite,
  onDelete,
  onOpenAuthModal,
  isAuthenticated = false,
  emptyMessage = 'No recipes found',
}) {
  const dispatch = useDispatch();

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

  const isNextpage = useSelector(hasNextPage);

  useEffect(() => {
    if (!items.length && !isLoading && !error) {
      if (variant === 'favorites') {
        dispatch(fetchFavRecipes());
      } else if (variant === 'own') {
        dispatch(fetchOwnRecipes());
      }
    }
  }, [dispatch, variant, items.length, isLoading, error]);

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
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={`${styles.wrap} ${items.length === 1 ? styles['single-item'] : ''}`}>
      {items.map(r => (
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
      {isNextpage && <LoadMoreBtn />}
    </div>
  );
}
