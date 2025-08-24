import { Route, Routes } from 'react-router';
import { Suspense } from 'react';
import { Layout } from './component/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';

export const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/*Other routes going here too */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
