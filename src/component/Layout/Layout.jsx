import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
