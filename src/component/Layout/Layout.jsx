//import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </div>
  );
};
