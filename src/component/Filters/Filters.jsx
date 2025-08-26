import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getSelectedCategory,
  getSelectedIngredients,
} from '../../redux/filters/selectors';
import {
  setSelectedCategory,
  setSelectedIngredients,
} from '../../redux/filters/slice';
import { getCategoriesSlice } from '../../redux/categories/selectors';
import { getIngredientsSlice } from '../../redux/ingredients/selectors';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';

export default function Filters() {
  const dispatch = useDispatch();

  const categories = useSelector(getCategoriesSlice);
  const ingredients = useSelector(getIngredientsSlice);

  const selectedCategories = useSelector(getSelectedCategory);
  console.log('🚀 ~ Filters ~ selectedCategories:', selectedCategories);
  const selectedIngredients = useSelector(getSelectedIngredients);
  console.log('🚀 ~ Filters ~ selectedIngredients:', selectedIngredients);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCategoryChange = e => {
    dispatch(
      setSelectedCategory({
        name: e.target.value,
        _id: e.target.id,
      })
    );
  };

  const handleIngredientChange = e => {
    dispatch(
      setSelectedIngredients({
        name: e.target.value,
        _id: e.target.id,
      })
    );
  };

  const handleReset = () => {
    dispatch();
  };

  return (
    <>
      <form action="setFilters">
        <button type="button" onClick={handleReset}>
          Reset filters
        </button>
        <select
          name="ingredients"
          id="selectIngredients"
          value={
            { ...selectedCategories[selectedCategories.length - 1] }.name || ''
          }
          onChange={handleCategoryChange}
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
                  value={ingredient.name}
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
          value={
            { ...selectedIngredients[selectedIngredients.length - 1] }.name ||
            ''
          }
          onChange={handleIngredientChange}
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
                  id={category._id}
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
