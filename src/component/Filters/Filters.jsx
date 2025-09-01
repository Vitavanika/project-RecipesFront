import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
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
  setAllFilters,
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
import { getTotalRecipes } from '../../redux/recipes/selectors';
import { resetHits, setPaginationParams } from '../../redux/recipes/slice';

export default function Filters() {
  const dispatch = useDispatch();

  const categories = useSelector(getCategoriesSlice);
  const ingredients = useSelector(getIngredientsSlice);

  const selectedCategories = useSelector(getSelectedCategory);
  const selectedIngredients = useSelector(getSelectedIngredients);
  const searchPhrase = useSelector(getSearchPhrase);
  const page = useSelector(s => s.recipes.filteredRecipes.page);
  const perPage = useSelector(s => s.recipes.filteredRecipes.perPage);

  const isloadedCategory = useSelector(getIsLoadedCategories);
  const isloadedIngredients = useSelector(getIsLoadedIngredients);

  const totalRecipes = useSelector(getTotalRecipes);

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const prevFiltersRef = useRef({
    categories: [],
    ingredients: [],
    searchPhrase: '',
  });
  const prevPageRef = useRef({ page: 1, perPage: 12 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);

  const isMultiselect = false;

  // Завантажуємо категорії та інгредієнти
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getFilteredRecipes({ append: false }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCurrentCategory('');
    }
    if (selectedIngredients.length === 0) {
      setCurrentIngredient('');
    }
  }, [selectedCategories.length, selectedIngredients.length]);

  useEffect(() => {
    if (!isloadedCategory || !isloadedIngredients) return;

    const category = searchParams.getAll('category');
    const ingredients = searchParams.getAll('ingredients');
    const searchPhrase = searchParams.get('searchPhrase') || '';
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 12;

    dispatch(setAllFilters({ category, ingredients, searchPhrase }));
    dispatch(setPaginationParams({ page, perPage }));

    setCurrentCategory(category[0] || '');
    setCurrentIngredient(ingredients[0] || '');
  }, [searchParams, isloadedCategory, isloadedIngredients, dispatch]);

  useEffect(() => {
    if (!isloadedCategory || !isloadedIngredients) return;

    const filtersChanged =
      selectedCategories.join() + selectedIngredients.join() + searchPhrase !==
      prevFiltersRef.current.categories.join() +
        prevFiltersRef.current.ingredients.join() +
        prevFiltersRef.current.searchPhrase;

    const pageChanged =
      page !== prevPageRef.current.page ||
      perPage !== prevPageRef.current.perPage;

    if (filtersChanged) {
      dispatch(resetHits());
      dispatch(getFilteredRecipes({ append: false }));
    } else if (pageChanged) {
      dispatch(getFilteredRecipes({ append: true }));
    }

    prevFiltersRef.current = {
      categories: selectedCategories,
      ingredients: selectedIngredients,
      searchPhrase,
    };
    prevPageRef.current = { page, perPage };
  }, [
    selectedCategories,
    selectedIngredients,
    searchPhrase,
    page,
    perPage,
    isloadedCategory,
    isloadedIngredients,
    dispatch,
  ]);

  // useEffect(() => {
  //   if (JSON.stringify(searchParams) !== '{}') {
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener('resize', getViewportWidth);
    function getViewportWidth() {
      setViewportWidth(window.innerWidth);
    }
    return () => window.removeEventListener('resize', getViewportWidth);
  }, []);

  const formContainer = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.id === 'openFiltersButton') {
        return;
      }
      if (
        formContainer.current &&
        !formContainer.current.contains(event.target)
      ) {
        setIsOpenFilter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formContainer]);

  //----------Functions----------------------//

  const toggleFilters = event => {
    event.stopPropagation();
    setIsOpenFilter(prevState => !prevState);
  };

  const handlesetIsOpenCategory = () => setIsOpenCategory(true);
  const handlesetIsCloseCategory = () => setIsOpenCategory(false);
  const handlesetIsOpenIngredient = () => setIsOpenIngredient(true);
  const handlesetIsCloseIngredient = () => setIsOpenIngredient(false);

  const handleCategoryChange = e => {
    if (!e.target.value) return;

    setCurrentCategory(e.target.value);
    const newCategories = isMultiselect
      ? [...selectedCategories, e.target.value]
      : [e.target.value];
    dispatch(setSelectedCategory(newCategories));

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (isMultiselect) {
        next.append('category', e.target.value);
      } else {
        next.set('category', e.target.value);
      }
      return next;
    });
  };

  const handleIngredientChange = e => {
    if (!e.target.value) return;

    setCurrentIngredient(e.target.value);
    const newIngredients = isMultiselect
      ? [...selectedIngredients, e.target.value]
      : [e.target.value];
    dispatch(setSelectedIngredients(newIngredients));

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (isMultiselect) {
        next.append('ingredients', e.target.value);
      } else {
        next.set('ingredients', e.target.value);
      }
      return next;
    });
  };

  const handleReset = () => {
    setSearchParams({});
    dispatch(resetFilters([]));
    dispatch(resetHits());
  };

  //----------Functions----------------------//

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.wrapper}>
        <p className={styles.recipesCount}>{`${totalRecipes ?? 0} recipes`}</p>
        <div className={styles.formWrapper}>
          {viewportWidth < 1440 && (
            <div className={styles.butonWrapper}>
              <button
                id="openFiltersButton"
                type="button"
                aria-label="Filters button"
                className={styles.filtersButton}
                onClick={toggleFilters}
              >
                Filters
                <div className={styles.thumb}>
                  {isOpenFilter ? (
                    <svg
                      width="16"
                      height="15"
                      className={styles.filterIconClose}
                    >
                      <use href="/sprite.svg#icon-close-circle"></use>
                    </svg>
                  ) : (
                    <svg width="16" height="15" className={styles.filterIcon}>
                      <use href="/sprite.svg#icon-filter"></use>
                    </svg>
                  )}
                </div>
              </button>
            </div>
          )}
          <div
            ref={formContainer}
            className={`${styles.formContainer} ${
              isOpenFilter && styles.openFilters
            }`}
          >
            <form action="setFilters" className={styles.filtersForm}>
              <button
                className={styles.resetButton}
                type="button"
                onClick={handleReset}
              >
                Reset filters
              </button>
              <label htmlFor="ingredients" className={styles.selectLabel}>
                <select
                  className={styles.select}
                  name="ingredients"
                  id="selectIngredients"
                  value={currentIngredient}
                  onChange={handleIngredientChange}
                  onFocus={handlesetIsOpenIngredient}
                  onBlur={handlesetIsCloseIngredient}
                  key="ingredients"
                >
                  <option value="" disabled hidden>
                    Ingredient
                  </option>
                  {ingredients.length === 0 ? (
                    <option>Loading...</option>
                  ) : (
                    ingredients.map(ingredient => (
                      <option
                        name={ingredient.name}
                        value={ingredient._id}
                        key={ingredient._id}
                      >
                        {ingredient.name}
                      </option>
                    ))
                  )}
                </select>
                <svg
                  width="16"
                  height="15"
                  className={`${styles.selectIcon} ${
                    isOpenIngredient && styles.openSelectIcon
                  }`}
                >
                  <use href="/sprite.svg#icon-chevron-down"></use>
                </svg>
              </label>
              <label htmlFor="ingredients" className={styles.selectLabel}>
                <select
                  className={styles.select}
                  name="categories"
                  id="selectCategories"
                  value={currentCategory}
                  onChange={handleCategoryChange}
                  onFocus={handlesetIsOpenCategory}
                  onBlur={handlesetIsCloseCategory}
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {categories.length === 0 ? (
                    <option>Loading...</option>
                  ) : (
                    categories.map(category => (
                      <option
                        name={category.name}
                        value={category.name}
                        key={category._id}
                      >
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                <svg
                  width="16"
                  height="15"
                  className={`${styles.selectIcon} ${
                    isOpenCategory && styles.openSelectIcon
                  }`}
                >
                  <use href="/sprite.svg#icon-chevron-down"></use>
                </svg>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
