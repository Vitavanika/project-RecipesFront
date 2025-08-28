import Filters from '../../component/Filters/Filters';
import { SearchBox } from '../../component/SearchBox/SearchBox';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>Ця сторінка в розробці.</p>
      <SearchBox />
      <Filters />
    </div>
  );
};

export default HomePage;
