import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
import { selectAuthNavModalOpen } from './redux/misc/selectors.js';
import { closeAuthNavModal } from './redux/misc/slice.js';
import { useEffect, useRef } from 'react';

// Імпорт компонентів
import { Layout } from './component/Layout/Layout.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import RecipeViewPage from './pages/RecipeViewPage/RecipeViewPage.jsx';
import { AuthNavModal } from './component/AuthNavModal/AuthNavModal.jsx';

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
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);

  // AuthNavModal controlls
  const modalRef = useRef(null);
  const isAuthNavOpen = useSelector(selectAuthNavModalOpen);

  useEffect(() => {
    const handleClick = event => {
      if (
        modalRef.current &&
        event.target &&
        !modalRef.current.contains(event.target)
      ) {
        dispatch(closeAuthNavModal());
      }
    };

    if (isAuthNavOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      console.log('removing event listener');
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isAuthNavOpen, dispatch]);
  // End of AuthNavModal

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // add React loader here
  return isRefreshing ? (
    <strong>Loading...</strong>
  ) : (
    <>
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
      {isAuthNavOpen && (
        <AuthNavModal
          ref={modalRef}
          onClick={() => dispatch(closeAuthNavModal())}
        />
      )}
    </>
  );
};

export default App;
