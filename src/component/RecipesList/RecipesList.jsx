import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipesList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations';

export default function RecipesList({
  variant = 'own',
  onLearnMore,
  onToggleFavorite,
  onDelete,
  onOpenAuthModal,
  isAuthenticated = false,
  emptyMessage = 'No recipes found',
}) {
  const dispatch = useDispatch();

  const items = useSelector(s =>
    variant === 'favorites'
      ? s?.recipes?.favorites?.items ?? []
      : s?.recipes?.own?.items ?? []
  );

  const isLoading = useSelector(s =>
    variant === 'favorites'
      ? Boolean(s?.recipes?.favorites?.isLoading)
      : Boolean(s?.recipes?.own?.isLoading)
  );

  const error = useSelector(s =>
    variant === 'favorites'
      ? s?.recipes?.favorites?.error ?? ''
      : s?.recipes?.own?.error ?? ''
  );

  useEffect(() => {
    if (isLoading) return;
    if (items.length === 0) {
      if (variant === 'favorites') {
        dispatch(fetchFavRecipes());
      } else {
        dispatch(fetchOwnRecipes());
      }
    }
  }, [dispatch, variant, items.length, isLoading]);

  if (isLoading) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        <span className={styles.spinner} /> Loading…
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>⚠ {String(error)}</div>;
  }

  if (!items.length) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrap}>
      {items.map(r => (
        <RecipeCard
          key={r._id || r.id}
          recipe={r} // передаємо весь об’єкт
          variant={variant}
          isAuthenticated={isAuthenticated}
          onLearnMore={onLearnMore}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onOpenAuthModal={onOpenAuthModal}
          disabled={r._pending === true}
        />
      ))}
    </div>
  );
}
