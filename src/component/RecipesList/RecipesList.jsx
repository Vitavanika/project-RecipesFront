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
  emptyMessage = 'No recipes found',
}) {
  if (!isLoading && items.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrap}>
      {items.map(r => (
        <RecipeCard
          key={r.id}
          id={r.id}
          title={r.title}
          description={r.description}
          imageUrl={r.imageUrl}
          calories={r.calories}
          prepTime={r.prepTime}
          isFavorite={r.isFavorite}
          variant={variant}
          onLearnMore={onLearnMore}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          disabled={r._pending === true}
        />
      ))}

      {isLoading && (
        <div className={styles.loader} role="status" aria-live="polite">
          <span className={styles.spinner} /> Loading…
        </div>
      )}

      {!!error && <div className={styles.error}>⚠ {error}</div>}
    </div>
  );
}
