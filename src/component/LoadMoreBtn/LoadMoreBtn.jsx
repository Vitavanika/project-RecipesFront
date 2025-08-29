import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, getTotalPages, selectLoading } from '../../redux/recipes/selectors';
import { setPage } from '../../redux/recipes/slice';
import { getFilteredRecipes } from '../../redux/recipes/operations';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(getCurrentPage);
  const totalPages = useSelector(getTotalPages);
  const loading = useSelector(selectLoading);

  const handleLoadMore = () => {
    const nextPage = (currentPage ?? 1) + 1;
    dispatch(setPage({ page: nextPage }));
    dispatch(getFilteredRecipes());
  };

  if (!totalPages || currentPage >= totalPages || loading) {
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
