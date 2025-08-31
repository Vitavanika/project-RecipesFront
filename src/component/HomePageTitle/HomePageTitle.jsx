import { useSelector } from 'react-redux';
import { getSearchPhrase } from '../../redux/filters/selectors';
import styles from './HomePageTitle.module.css';

export const HomePageTitle = () => {
  const searchQuery = useSelector(getSearchPhrase);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {searchQuery.trim()
          ? `Search Results for "${searchQuery}"`
          : `Recepies`}
      </h2>
    </div>
  );
};
