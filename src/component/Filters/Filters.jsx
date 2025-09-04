import styles from './Filters.module.css';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import {
  getPage,
  getPerPage,
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
import { getCategoriesSlice } from '../../redux/categories/selectors';
import { getIngredientsSlice } from '../../redux/ingredients/selectors';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';
import { getFilteredRecipes } from '../../redux/recipes/operations';
import { getFilteredTotalRecipes } from '../../redux/recipes/selectors';

export default function Filters() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // --------------------
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const categories = useSelector(getCategoriesSlice);
  const ingredients = useSelector(getIngredientsSlice);

  // --------------------
  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const ingredients = searchParams.get('ingredients');
    const searchPhrase = searchParams.get('searchPhrase') || '';
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 12;

    dispatch(
      setAllFilters({
        category,
        ingredients,
        searchPhrase,
        page,
        perPage,
      })
    );
    setIsFiltersInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------
  const searchPhrase = useSelector(getSearchPhrase);
  const selectedCategories = useSelector(getSelectedCategory);
  const selectedIngredients = useSelector(getSelectedIngredients);
  const page = useSelector(getPage);
  const perPage = useSelector(getPerPage);
  const totalRecipes = useSelector(getFilteredTotalRecipes);

  // --------------------
  const query = useMemo(() => {
    const q = {};
    if (searchPhrase) q.searchPhrase = searchPhrase;
    if (selectedCategories) q.category = selectedCategories;
    if (selectedIngredients) q.ingredients = selectedIngredients;
    if (page && page > 1) q.page = page;
    if (page > 1 && perPage) q.perPage = perPage;

    return q;
  }, [searchPhrase, selectedCategories, selectedIngredients, page, perPage]);

  // --------------------

  useEffect(() => {
    if (!isFiltersInitialized) return;
    dispatch(getFilteredRecipes(query));
  }, [dispatch, query, isFiltersInitialized]);

  // --------------------

  useEffect(() => {
    if (!isFiltersInitialized) return;

    const newParams = new URLSearchParams();
    if (searchPhrase) newParams.set('searchPhrase', searchPhrase);
    if (selectedCategories) newParams.set('category', selectedCategories);
    if (selectedIngredients) newParams.set('ingredients', selectedIngredients);
    if (page && page > 1) newParams.set('page', page);
    if (page > 1 && perPage) newParams.set('perPage', perPage);

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [
    dispatch,
    searchPhrase,
    selectedCategories,
    selectedIngredients,
    page,
    perPage,
    isFiltersInitialized,
    searchParams,
    setSearchParams,
  ]);

  // --------------------
  useEffect(() => {
    function getViewportWidth() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', getViewportWidth);
    return () => window.removeEventListener('resize', getViewportWidth);
  }, []);

  // --------------------
  const formContainer = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.id === 'openFiltersButton') return;
      if (
        formContainer.current &&
        !formContainer.current.contains(event.target)
      ) {
        setIsOpenFilter(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilters = event => {
    event.stopPropagation();
    setIsOpenFilter(prev => !prev);
  };

  // --------------------
  const valueForIngredientSelect = (() => {
    if (!selectedIngredients) return null;
    const ing = ingredients.find(i => i._id === selectedIngredients);
    return ing ? { value: ing._id, label: ing.name } : null;
  })();

  const valueForCategorySelect = (() => {
    if (!selectedCategories) return null;
    const cat = categories.find(c => c.name === selectedCategories);
    return cat ? { value: cat._id, label: cat.name } : null;
  })();

  const handleCategoryChange = value => {
    if (!value) return;
    dispatch(setSelectedCategory(value.label));
  };

  const handleIngredientChange = value => {
    if (!value) return;

    dispatch(setSelectedIngredients(value.value));
  };

  const handleReset = () => {
    setSearchParams({});
    dispatch(resetFilters());
  };

  // --------------------
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
      '&:hover': { borderColor: '#000' },
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
      color: '#000',
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
      maxHeight: 41 * 6,
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
          transformOrigin: 'center',
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

  // --------------------
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
              isOpenFilter ? styles.openFilters : ''
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
                  isLoading={!ingredients.length}
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
