import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as recipeSelectors from '../../redux/recipes/selectors';
import { setPage } from '../../redux/filters/slice';
import * as recipeSetters from '../../redux/recipes/slice';

import css from './LoadMoreBtn.module.css';
import { useLocation } from 'react-router';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;

  const getPaginationParams = {
    '/': {
      currentPage: recipeSelectors.getFilteredCurrentPage,
      totalPages: recipeSelectors.getFilteredTotalPages,
      loading: recipeSelectors.getFilteredLoading,
    },
    '/profile/favorites': {
      currentPage: recipeSelectors.getFavoritesCurrentPage,
      totalPages: recipeSelectors.getFavoritesTotalPages,
      loading: recipeSelectors.getFavoritesRecipesLoading,
    },
    '/profile/own': {
      currentPage: recipeSelectors.getOwnCurrentPage,
      totalPages: recipeSelectors.getOwnTotalPages,
      loading: recipeSelectors.getOwnRecipesLoading,
    },
  };

  const setPaginationParams = {
    '/': {
      page: setPage,
    },
    '/profile/favorites': {
      page: recipeSetters.setFavoritesPage,
    },
    '/profile/own': {
      page: recipeSetters.setOwnPage,
    },
  };

  const currentPage = useSelector(getPaginationParams[path].currentPage);
  const totalPages = useSelector(getPaginationParams[path].totalPages);
  const loading = useSelector(getPaginationParams[path].loading);

  const setNextPage = setPaginationParams[path].page;

  const handleLoadMore = () => {
    const nextPage = (currentPage ?? 1) + 1;
    dispatch(setNextPage(nextPage));
  };

  if (!totalPages || currentPage >= totalPages) {
    return null;
  }

  return (
    <button
      className={css.loadMoreBtn}
      onClick={handleLoadMore}
      type="button"
      disabled={loading}
    >
      {loading ? <div className={css.spinner}></div> : 'Load more'}
    </button>
  );
};

export default LoadMoreBtn;
