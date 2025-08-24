import React from 'react';
import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
}
