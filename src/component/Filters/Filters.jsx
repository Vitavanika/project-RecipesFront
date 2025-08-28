import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  getSearchPhrase,
  getSelectedCategory,
  getSelectedIngredients,
} from '../../redux/filters/selectors';
import {
  resetFilters,
  setSelectedCategory,
  setSelectedIngredients,
} from '../../redux/filters/slice';
import {
  getCategoriesSlice,
  getIsLoadedCategories,
} from '../../redux/categories/selectors';
import {
  getIngredientsSlice,
  getIsLoadedIngredients,
} from '../../redux/ingredients/selectors';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';
import { getFilteredRecipes } from '../../redux/recipes/operations';
import {
  getTotalRecipes,
  selectFilteredRecipes,
} from '../../redux/recipes/selectors';
import { setAllFilters } from '../../redux/filters/slice.js';
import { setPaginationParams } from '../../redux/recipes/slice.js';

export default function Filters() {
  const dispatch = useDispatch();

  const categories = useSelector(getCategoriesSlice);
  const ingredients = useSelector(getIngredientsSlice);

  const selectedCategories = useSelector(getSelectedCategory);
  console.log('🚀 ~ Filters ~ selectedCategories:', selectedCategories);
  const selectedIngredients = useSelector(getSelectedIngredients);
  console.log('🚀 ~ Filters ~ selectedIngredients:', selectedIngredients);
  const filteredRecipesTest = useSelector(selectFilteredRecipes);
  const searchPhrase = useSelector(getSearchPhrase);
  console.log('🚀 ~ Filters ~ filteredRecipesTest:', filteredRecipesTest);
  const isloadedCategory = useSelector(getIsLoadedCategories);
  const isloadedIngredients = useSelector(getIsLoadedIngredients);
  const isMultiselect = false;

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState('');

  const totalRecipes = useSelector(getTotalRecipes);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (isloadedCategory && isloadedIngredients) dispatch(getFilteredRecipes());
  }, [
    dispatch,
    selectedCategories,
    selectedIngredients,
    searchPhrase,
    isloadedCategory,
    isloadedIngredients,
  ]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const ingredients = searchParams.getAll('ingredients');
    const searchPhrase = searchParams.get('searchPhrase') || '';
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 12;

    dispatch(setAllFilters({ searchPhrase, category, ingredients }));
    dispatch(setPaginationParams({ page, perPage }));
  }, [searchParams, dispatch]);

  const handleCategoryChange = e => {
    if (e.target.value) {
      setCurrentCategory(e.target.value);
      if (isMultiselect) {
        dispatch(setSelectedCategory([...selectedCategories, e.target.value]));
      } else {
        dispatch(setSelectedCategory([e.target.value]));
      }
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set('category', e.target.value);
        return next;
      });
    }
  };

  const handleIngredientChange = e => {
    if (e.target.value) {
      setCurrentIngredient(e.target.value);
      if (isMultiselect) {
        dispatch(
          setSelectedIngredients([...selectedIngredients, e.target.value])
        );
      } else {
        dispatch(setSelectedIngredients([e.target.value]));
      }
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set('ingredient', e.target.value);
        return next;
      });
    }
  };

  const handleReset = () => {
    setSearchParams({});
    setCurrentCategory([]);
    setCurrentIngredient([]);
    dispatch(resetFilters());
  };

  return (
    <>
      <p>{`${totalRecipes ?? 0} recipes`}</p>
      <form action="setFilters">
        <button type="button" onClick={handleReset}>
          Reset filters
        </button>
        <select
          name="ingredients"
          id="selectIngredients"
          value={currentIngredient}
          onChange={handleIngredientChange}
          key="ingredients"
        >
          <option value="" disabled hidden>
            Please, select ingredient
          </option>
          {ingredients.length === 0 ? (
            <option>Loading...</option>
          ) : (
            ingredients.map(ingredient => {
              return (
                <option
                  name={ingredient.name}
                  value={ingredient._id}
                  key={ingredient._id}
                >
                  {ingredient.name}
                </option>
              );
            })
          )}
        </select>
        <select
          name="categories"
          id="selectCategories"
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled hidden>
            Please, select category
          </option>
          {categories.length === 0 ? (
            <option>Loading...</option>
          ) : (
            categories.map(category => {
              return (
                <option
                  name={category.name}
                  value={category.name}
                  key={category._id}
                >
                  {category.name}
                </option>
              );
            })
          )}
        </select>
      </form>
    </>
  );
}
