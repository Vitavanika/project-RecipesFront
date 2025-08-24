import { Routes, Route, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from './redux/auth/selectors.js';

// Імпорт компонентів
import { Layout } from './component/Layout/Layout.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import RecipeViewPage from './pages/RecipeViewPage/RecipeViewPage.jsx';

// Приватний маршрут - доступний тільки для авторизованих користувачів
const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

// Публічний маршрут - доступний для всіх
const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Публічні маршрути */}
        <Route index element={<HomePage />} />
        <Route path="recipe-view/:recipeId" element={<RecipeViewPage />} />

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
