import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ recipeType = 'own' }) => {
  const dispatch = useDispatch();

  const { currentPage, totalPages, loading } = useSelector(state => ({
    ...state.recipes[recipeType],
    loading: state.recipes.loading,
  }));

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const action = recipeType === 'own' ? fetchOwnRecipes : fetchFavRecipes;
    dispatch(action({ page: nextPage }));
  };

  // Не показываем кнопку если:
  // 1. Это последняя страница
  // 2. Идет загрузка
  // 3. Нет страниц вообще
  if (currentPage >= totalPages || loading || totalPages === 0) {
    return null;
  }

  return (
    <button
      className={css.loadMoreBtn}
      onClick={handleLoadMore}
      type="button"
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load more'}
    </button>
  );
};

export default LoadMoreBtn;
