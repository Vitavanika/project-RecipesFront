import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipesList.module.css';
import { selectFilteredRecipes } from '../../redux/recipes/selectors';

export default function RecipesList() {
  const filteredRecipes = useSelector(selectFilteredRecipes);
  console.log('🚀 ~ RecipesList ~ filteredRecipes:', filteredRecipes.hits);
  return (
    <div className={styles.container}>
      {filteredRecipes.hits?.map(recipe => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ))}
    </div>
  );
}
