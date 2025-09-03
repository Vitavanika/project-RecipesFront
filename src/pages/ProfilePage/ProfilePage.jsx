import css from './ProfilePage.module.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfileNavigation from '../../component/ProfileNavigation/ProfileNavigation';
import RecipesList from '../../component/RecipesList/RecipesList';
import { fetchRecipesByVariant } from '../../redux/recipes/operations.js';
import { getIsRefreshing } from '../../redux/auth/selectors';
import {
  selectOwnRecipes,
  selectFavRecipes,
  selectOwnRecipesLoading,
  selectFavRecipesLoading,
} from '../../redux/recipes/selectors';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);

  const isOwnLoading = useSelector(selectOwnRecipesLoading);
  const isFavLoading = useSelector(selectFavRecipesLoading);
  const ownRecipes = useSelector(selectOwnRecipes);
  const favRecipes = useSelector(selectFavRecipes);

  const items = recipeType === 'own' ? ownRecipes : favRecipes;
  const isLoading = recipeType === 'own' ? isOwnLoading : isFavLoading;

  useEffect(() => {
    if (!recipeType || (recipeType !== 'favorites' && recipeType !== 'own')) {
      navigate('/profile/own', { replace: true });
    }
  }, [recipeType, navigate]);

  useEffect(() => {
    if (!isRefreshing) {
      dispatch(fetchRecipesByVariant(recipeType));
    }
  }, [recipeType, dispatch, isRefreshing]);

  const getEmptyMessage = () => {
    if (recipeType === 'favorites') {
      return "You don't have any saved recipes yet. Add some by clicking the save button.";
    }
    return "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";
  };

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList
        variant={recipeType}
        items={items}
        isLoading={isLoading}
        emptyMessage={getEmptyMessage()}
      />
    </div>
  );
};

export default ProfilePage;
