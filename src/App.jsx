import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
import { useEffect } from 'react';

// Імпорт компонентів
import { Layout } from './component/Layout/Layout.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import RecipeViewPage from './pages/RecipeViewPage/RecipeViewPage.jsx';
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
  );
};

export default App;
