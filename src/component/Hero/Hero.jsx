import { SearchBox } from '../SearchBox/SearchBox';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <SearchBox />
      </div>
    </div>
  );
};
