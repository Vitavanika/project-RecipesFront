import css from './ProfilePage.module.css';
import { useNavigate, useParams } from 'react-router';

import ProfileNavigation from '../../component/ProfileNavigation/ProfileNavigation';
import RecipesList from '../../component/RecipesList/RecipesList';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const navigate = useNavigate();

  if (!recipeType || (recipeType !== 'favorites' && recipeType !== 'own')) {
    navigate('/profile/own', { replace: true });
    return null;
  }

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList variant={recipeType} />
    </div>
  );
};

export default ProfilePage;
