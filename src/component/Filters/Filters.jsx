import styles from './Filters.module.css';
import Select, { components } from 'react-select';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const prevFiltersRef = useRef({
    categories: [],
    ingredients: [],
    searchPhrase: '',
  });
  const prevPageRef = useRef({ page: 1, perPage: 12 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const isMultiselect = false;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      margin: 0,
      padding: 0,
      paddingRight: 4,
      border: '1px solid #d9d9d9',
      borderRadius: 4,
      width: 296,
      minHeight: 33,
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 0, 0, 0.25)' : 'none',
      borderColor: state.isFocused ? '#000' : '#d9d9d9',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        borderColor: '#000',
      },
    }),
    placeholder: provided => ({
      ...provided,
      margin: 0,
      padding: 0,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '155%',
      color: '#595d62',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      margin: 0,
      padding: 0,
      transition: 'transform 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
      color: '#555',
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: state.isFocused ? 4 : 8,
      padding: '0 8px 0 12px',
      height: 41,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      backgroundColor: state.isFocused ? '#d3d3d3' : '#fff',
      color: state.isSelected ? '#000' : '#000',
      cursor: 'pointer',
    }),
    menu: provided => ({
      ...provided,
      margin: 0,
      padding: 0,
      maxHeight: 41 * 6,
      overflowY: 'hidden',
    }),
    menuList: provided => ({
      ...provided,
      maxHeight: 57 * 6,
      overflowX: 'hidden',
      padding: 0,
    }),
    singleValue: provided => ({
      ...provided,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '155%',
      color: '#000',
    }),
  };

  const DropdownIndicator = props => (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="15"
        style={{
          marginRight: 8,
          marginLeft: 4,
          transform: props.selectProps.menuIsOpen
            ? 'rotateY(180deg)'
            : 'rotateY(0deg)',
          transition: 'transform 0.2s ease-in-out',
          fill: '#fff',
          strokeWidth: 1,
          stroke: '#000',
        }}
      >
        <use href="/sprite.svg#icon-chevron-down"></use>
      </svg>
    </components.DropdownIndicator>
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getFilteredRecipes({ append: false }));
  }, [dispatch]);

  useEffect(() => {
    if (!isloadedCategory || !isloadedIngredients) return;

    const category = searchParams.getAll('category');
    const ingredients = searchParams.getAll('ingredients');
    const searchPhrase = searchParams.get('searchPhrase') || '';
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 12;

    dispatch(setAllFilters({ category, ingredients, searchPhrase }));
    dispatch(setPaginationParams({ page, perPage }));
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

  const toggleFilters = event => {
    event.stopPropagation();
    setIsOpenFilter(prevState => !prevState);
  };

  const valueForCategorySelectTemp = selectedCategories
    .map(catName => {
      const category = categories.find(cat => cat.name === catName);
      return category ? { value: category._id, label: category.name } : null;
    })
    .filter(Boolean);

  const valueForCategorySelect =
    valueForCategorySelectTemp.length > 0 ? valueForCategorySelectTemp[0] : '';

  const valueForIngredientSelectTemp = selectedIngredients
    .map(selectedId => {
      const ingredient = ingredients.find(cat => cat._id === selectedId);
      return ingredient
        ? { value: ingredient._id, label: ingredient.name }
        : '';
    })
    .filter(Boolean);

  const valueForIngredientSelect =
    valueForIngredientSelectTemp.length > 0
      ? valueForIngredientSelectTemp[0]
      : null;

  const handleCategoryChange = values => {
    if (!values) return;

    const newCategories = isMultiselect
      ? [...selectedCategories, values.label]
      : [values.label];
    dispatch(setSelectedCategory(newCategories));

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (isMultiselect) {
        next.append('category', values.label);
      } else {
        next.set('category', values.label);
      }
      return next;
    });
  };

  const handleIngredientChange = values => {
    if (!values) return;

    const newIngredients = isMultiselect
      ? [...selectedIngredients, values.value]
      : [values.value];
    dispatch(setSelectedIngredients(newIngredients));

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (isMultiselect) {
        next.append('ingredients', values.value);
      } else {
        next.set('ingredients', values.value);
      }
      return next;
    });
  };

  const handleReset = () => {
    setSearchParams({});
    dispatch(resetFilters([]));
    dispatch(resetHits());
  };

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
              <label htmlFor="categories" className={styles.selectLabel}>
                <Select
                  options={categories.map(item => ({
                    value: item._id,
                    label: item.name,
                  }))}
                  styles={customStyles}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  placeholder="Category"
                  isLoading={!categories.length}
                  onChange={handleCategoryChange}
                  value={valueForCategorySelect}
                />
              </label>
              <label htmlFor="ingredients" className={styles.selectLabel}>
                <Select
                  options={ingredients.map(item => ({
                    value: item._id,
                    label: item.name,
                  }))}
                  styles={customStyles}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  placeholder="Ingredient"
                  onChange={handleIngredientChange}
                  value={valueForIngredientSelect}
                />
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
