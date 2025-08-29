import React from 'react';
import styles from './LoadMoreBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginationParams } from '../../redux/recipes/slice';
import { getCurrentPage, getPerPage } from '../../redux/recipes/selectors';

export default function LoadMoreBtn() {
  const dispatch = useDispatch();
  const page = useSelector(getCurrentPage);
  const perPage = useSelector(getPerPage);

  const handleClick = () => {
    dispatch(setPaginationParams({ page: page + 1, perPage }));
  };

  return (
    <button className={styles.loadMoreBtn} onClick={handleClick}>
      Load More
    </button>
  );
}
