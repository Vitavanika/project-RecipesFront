import css from './ProfilePage.module.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfileNavigation from '../../component/ProfileNavigation/ProfileNavigation';
import RecipesList from '../../component/RecipesList/RecipesList';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
} from '../../redux/recipes/operations.js';
import { getIsRefreshing } from '../../redux/auth/selectors';
import { getIsLoading } from '../../redux/recipes/selectors';
import Loader from '../../component/Loader/Loader';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (!recipeType || (recipeType !== 'favorites' && recipeType !== 'own')) {
      navigate('/profile/own', { replace: true });
    }
  }, [recipeType, navigate]);

  useEffect(() => {
    // Не завантажуємо дані, якщо додаток все ще оновлює користувача
    if (isRefreshing) return;

    // Виконуємо запит на основі типу рецептів
    if (recipeType === 'favorites') {
      dispatch(fetchFavRecipes());
    } else if (recipeType === 'own') {
      dispatch(fetchOwnRecipes());
    }
  }, [recipeType, dispatch, isRefreshing]);

  const getEmptyMessage = () => {
    if (recipeType === 'favorites') {
      return "You don't have any saved recipes yet. Add some by clicking the save button.";
    }
    return "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList variant={recipeType} emptyMessage={getEmptyMessage()} />
    </div>
  );
};

export default ProfilePage;
