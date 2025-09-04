import { useSelector } from 'react-redux';
import styles from './RecipesList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import NoRecipesFound from '../NoRecipiesFound/NoRecipesFound';
import { useLocation } from 'react-router';
import * as recipeSelectors from '../../redux/recipes/selectors';

export default function RecipesList() {
  const location = useLocation();
  const path = location.pathname;

  const getRenderParams = {
    '/': recipeSelectors.selectFilteredRecipes,
    '/profile/favorites': recipeSelectors.getFavorites,
    '/profile/own': recipeSelectors.getOwn,
  };

  const currentState = useSelector(getRenderParams[path]);

  const hits = currentState.hits;
  const totalRecipes = currentState.totalItems;
  const hasNextPage = currentState.hasNextPage;
  const isLoading = currentState.isLoading;
  const error = currentState.error;

  if (isLoading && !hits.length) {
    return (
      <div className={styles.loader} role="status" aria-live="polite">
        <span className={styles.spinner} /> Loading…
      </div>
    );
  }

  if (error && !hits.length) {
    return <div className={styles.error}>⚠️ {String(error)}</div>;
  }

  if (!hits.length && !isLoading) {
    if (path === '/') {
      return <NoRecipesFound />;
    }

    if (path === '/profile/favorites' || path === '/profile/own') {
      const emptyMessage =
        path === '/profile/favorites'
          ? "You don't have any saved recipes yet. Add some by clicking the save button."
          : "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";

      return <div className={styles.emptyMessage}>{emptyMessage}</div>;
    }
  }

  const uniqueItems = hits.filter(
    (recipe, index, self) => index === self.findIndex(r => r._id === recipe._id)
  );

  return (
    <>
      {(path === '/profile/favorites' || path === '/profile/own') && (
        <div className={styles.countWrapper}>
          <p className={styles.recipesCount}>{`${
            totalRecipes ?? 0
          } recipes`}</p>
        </div>
      )}
      <div
        className={`${styles.wrap} ${
          uniqueItems.length === 1 ? styles['single-item'] : ''
        }`}
      >
        {uniqueItems.map(r => (
          <RecipeCard
            key={r._id || r.id}
            recipe={r}
            disabled={r._pending === true}
          />
        ))}
        {hasNextPage && <LoadMoreBtn />}
      </div>
    </>
  );
}
