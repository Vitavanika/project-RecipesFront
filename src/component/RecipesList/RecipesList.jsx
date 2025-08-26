import styles from './RecipesList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipesList({
  items = [],
  variant = 'default',
  isLoading = false,
  error = '',
  onLearnMore,
  onToggleFavorite,
  onDelete,
  onOpenAuthModal,
  isAuthenticated = false,
  emptyMessage = 'No recipes found',
}) {
  if (isLoading) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        <span className={styles.spinner} /> Loading…
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>⚠ {error}</div>;
  }

  if (items.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrap}>
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
    </div>
  );
}
