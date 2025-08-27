//  "/profile/:recipeType"
import css from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import { selectError, selectFavRecipes, selectLoading, selectOwnRecipes } from "../../redux/recipes/selectors";
import { fetchFavRecipes, fetchOwnRecipes } from "../../redux/recipes/operations";

import ProfileNavigation from "../../component/ProfileNavigation/ProfileNavigation";
import RecipesList from "../../component/RecipesList/RecipesList";
import LoadMoreBtn from "../../component/LoadMoreBtn/LoadMoreBtn";



const ProfilePage = () => {

  const { recipeType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
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

  return (
    <div>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation/>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {!loading && !error && <RecipesList recipes={recipeListToRender}/>}
      <LoadMoreBtn/>
    </div>
  );
};

export default ProfilePage;