import { useDispatch } from 'react-redux';
import styles from './NoRecipesFound.module.css';
import { useSearchParams } from 'react-router';
import {
  resetFilters,
  setSelectedCategory,
  setSelectedIngredients,
  setAllFilters,
} from '../../redux/filters/slice';
import { resetHits, setPaginationParams } from '../../redux/recipes/slice';

export default function NoRecipesFound() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleClick = () => {
    setSearchParams({});
    dispatch(resetFilters([]));
    dispatch(resetHits());
  };

  return (
    <div className={styles.container}>
      <div className="wrapper">
        <h2 className="message">
          We’re sorry! We were not able to find a match.
        </h2>
        <button type="button" className="resetFilters" onClick={handleClick}>
          Reset serach and filters
        </button>
      </div>
    </div>
  );
}
