import Filters from '../../component/Filters/Filters';
import RecipesList from '../../component/RecipesList/RecipesList';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>Ця сторінка в розробці.</p>
      <Filters />
      <RecipesList />
    </div>
  );
};

export default HomePage;
