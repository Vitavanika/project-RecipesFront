import { Route, Routes } from 'react-router';
import { Suspense } from 'react';

export const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
