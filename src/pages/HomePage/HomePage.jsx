import { Hero } from '../../component/Hero/Hero';
import Filters from '../../component/Filters/Filters';
import RecipesList from '../../component/RecipesList/RecipesList';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Filters />
      <RecipesList />
    </div>
  );
};

export default HomePage;
