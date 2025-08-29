//  "/profile/:recipeType"
import css from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import { selectFavError, selectFavRecipes, selectLoading, selectOwnError, selectOwnRecipes } from "../../redux/recipes/selectors";
import { fetchFavRecipes, fetchOwnRecipes } from "../../redux/recipes/operations";

import ProfileNavigation from "../../component/ProfileNavigation/ProfileNavigation";
import RecipesList from "../../component/RecipesList/RecipesList";
// import LoadMoreBtn from "../../component/LoadMoreBtn/LoadMoreBtn";



const ProfilePage = () => {

  const { recipeType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const errorOwn = useSelector(selectOwnError);
  const errorFav = useSelector(selectFavError);
  const ownRecipes = useSelector(selectOwnRecipes);
  const favRecipes = useSelector(selectFavRecipes);

  useEffect(() => {
    if (!recipeType || (recipeType !== "favorites" && recipeType !== "own")) {
      navigate("/profile/own", { replace: true });
    }
  }, [recipeType, navigate]);

  useEffect (()=>{
    if (recipeType === "favorites") {
      dispatch(fetchFavRecipes());
    } else if (recipeType === "own") {
      dispatch(fetchOwnRecipes());
    }},[recipeType, dispatch]);


  const recipeListToRender = recipeType === "favorites" ? favRecipes : ownRecipes;
  const hasNoRecipes = recipeListToRender.length === 0;
  const currentError = recipeType === "favorites" ? errorFav : errorOwn;

  const getEmptyMessage = () => {
  if (recipeType === "favorites") {
    return "You don't have any saved recipes yet. Add some by clicking the save button.";
  } else if (recipeType === "own") {
    return "You haven't added your own recipes yet. Click 'Add recipes' to create your first recipe.";
  } else {
    return "No recipes to display.";
  }
};

  return (
    <div className={css.pageContainer}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation/>
      {loading && <p>Loading...</p>}
      {!loading && currentError && <p>Something went wrong</p>}
      {!loading && !currentError && hasNoRecipes && <p>{getEmptyMessage()}</p>}
      {!loading && !currentError && !hasNoRecipes && <RecipesList 
        items={recipeListToRender}
        variant={recipeType}
        isLoading={loading}
        error={currentError}
        emptyMessage={getEmptyMessage()}/>}
      {/* <LoadMoreBtn/> */}
    </div>
  );
};

export default ProfilePage;