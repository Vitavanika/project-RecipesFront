import { Hero } from '../../component/Hero/Hero';
import { SearchBox } from '../../component/SearchBox/SearchBox';

// маршрут "/"
const HomePage = () => {
  return (
    <div>
      <Hero />
      <h1>Home page</h1>
      <p>Ця сторінка в розробці.</p>
    </div>
  );
};

export default HomePage;
