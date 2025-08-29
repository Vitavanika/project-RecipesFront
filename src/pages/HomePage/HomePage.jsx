import Filters from '../../component/Filters/Filters';
import RecipesList from '../../component/RecipesList/RecipesList';
import { SearchBox } from '../../component/SearchBox/SearchBox';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <SearchBox />
      <Filters />
      <RecipesList />
    </div>
  );
};

export default HomePage;
