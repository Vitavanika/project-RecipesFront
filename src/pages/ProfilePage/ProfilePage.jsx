//  "/profile/:recipeType"
import css from "./ProfilePage.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import ProfileNavigation from "../../component/ProfileNavigation/ProfileNavigation";
import RecipesList from "../../component/RecipesList/RecipesList";

const ProfilePage = () => {
  const { recipeType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeType || (recipeType !== "favorites" && recipeType !== "own")) {
      navigate("/profile/own", { replace: true });
    }
  }, [recipeType, navigate]);

  const getEmptyMessage = () => {
    if (recipeType === "favorites") {
      return "You don't have any saved recipes yet. Add some by clicking the save button.";
    }
    return "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";
  };

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList variant={recipeType} emptyMessage={getEmptyMessage()} />
    </div>
  );
};

export default ProfilePage;
