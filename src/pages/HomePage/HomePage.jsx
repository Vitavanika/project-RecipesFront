import { Hero } from '../../component/Hero/Hero';
import Filters from '../../component/Filters/Filters';
import RecipesList from '../../component/RecipesList/RecipesList';
import { HomePageTitle } from '../../component/HomePageTitle/HomePageTitle';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomePageTitle />
      <Filters />
      <RecipesList variant="public" />
    </div>
  );
};

export default HomePage;
