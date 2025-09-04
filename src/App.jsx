import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
import { useEffect, lazy, Suspense } from 'react';

// Імпорт компонентів
import { Layout } from './component/Layout/Layout.jsx';
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.jsx'));
const RecipeViewPage = lazy(() => import('./pages/RecipeViewPage/RecipeViewPage.jsx'));
import Loader from './component/Loader/Loader.jsx';

// Приватний маршрут - доступний тільки для авторизованих користувачів
const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  if (isRefreshing) {
    return <Loader />;
  }
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

// Публічний маршрут - доступний для всіх
const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  if (isRefreshing) {
    return <Loader />;
  }
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Публічні маршрути */}
          <Route index element={<HomePage />} />
          <Route path="recipes/:recipeId" element={<RecipeViewPage />} />

          {/* Маршрут для авторизації */}
          <Route
            path="auth/:authType"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          {/* Приватні маршрути */}
          <Route
            path="add-recipe"
            element={
              <PrivateRoute>
                <AddRecipePage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile/:recipeType"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
