import css from './ProfilePage.module.css';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import ProfileNavigation from '../../component/ProfileNavigation/ProfileNavigation';
import RecipesList from '../../component/RecipesList/RecipesList';
import { fetchRecipesByVariant } from '../../redux/recipes/operations.js';
import { getIsRefreshing } from '../../redux/auth/selectors';
import * as recipeSelectors from '../../redux/recipes/selectors';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  const location = useLocation();
  const path = location.pathname;

  const getPaginationParams = {
    '/profile/favorites': {
      page: recipeSelectors.getFavoritesCurrentPage,
      perPage: recipeSelectors.getFavoritesPerPage,
    },
    '/profile/own': {
      page: recipeSelectors.getOwnCurrentPage,
      perPage: recipeSelectors.getOwnPerPage,
    },
  };

  const page = useSelector(getPaginationParams[path].page);
  const perPage = useSelector(getPaginationParams[path].perPage);

  const requestParams = useMemo(() => {
    const q = {};
    q.searchParams = {};
    q.searchParams.page = page;
    q.searchParams.perPage = perPage;
    q.recipeType = recipeType;
    return q;
  }, [page, perPage, recipeType]);

  useEffect(() => {
    if (!recipeType || (recipeType !== 'favorites' && recipeType !== 'own')) {
      navigate('/profile/own', { replace: true });
    }
  }, [recipeType, navigate]);

  useEffect(() => {
    if (!isRefreshing) {
      dispatch(fetchRecipesByVariant(requestParams));
    }
  }, [recipeType, requestParams, dispatch, isRefreshing]);

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList />
    </div>
  );
};

export default ProfilePage;
