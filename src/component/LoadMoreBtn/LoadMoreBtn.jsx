import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ recipeType }) => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(state =>
    recipeType === 'own' ? state.recipes.own : state.recipes.favorites
  );

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const action = recipeType === 'own' ? fetchOwnRecipes : fetchFavRecipes;
    dispatch(action({ page: nextPage }));
  };

  if (currentPage >= totalPages) {
    return null;
  }

  return (
    <button className={css.loadMoreBtn} onClick={handleLoadMore} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
