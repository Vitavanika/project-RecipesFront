import { useDispatch } from 'react-redux';
import styles from './NoRecipesFound.module.css';
import { useSearchParams } from 'react-router';
import { resetFilters } from '../../redux/filters/slice';
import { resetHits } from '../../redux/recipes/slice';

export default function NoRecipesFound() {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleClick = () => {
    setSearchParams({});
    dispatch(resetFilters([]));
    dispatch(resetHits());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.message}>
          We’re sorry! We were not able to find a match.
        </h2>
        <button
          type="button"
          className={styles.resetFiltersButton}
          onClick={handleClick}
        >
          Reset serach and filters
        </button>
      </div>
    </div>
  );
}
