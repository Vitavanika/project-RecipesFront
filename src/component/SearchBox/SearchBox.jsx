import { Field, Form, Formik } from 'formik';
import { useSearchParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// import { getFilteredRecipes } from '../../redux/recipes/operations';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import styles from './SearchBox.module.css';
import { setSearchPhrase } from '../../redux/filters/slice';
import {
  getSearchPhrase,
  // getSelectedCategory,
  // getSelectedIngredients,
} from '../../redux/filters/selectors';
// import { getCurrentPage, getPerPage } from '../../redux/recipes/selectors';

export const SearchBox = () => {
  const [, setSearchParams] = useSearchParams();
  const searchPhrase = useSelector(getSearchPhrase);
  const formInitialValue = { query: searchPhrase || '' };
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  // const page = useSelector(getCurrentPage);
  // const perPage = useSelector(getPerPage);
  // const selectedCategories = useSelector(getSelectedCategory);
  // const selectedIngredients = useSelector(getSelectedIngredients);

  const handleSubmit = values => {
    setIsSearching(true);
    const searchQuery = values.query.trim();
    if (!searchQuery) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.delete('searchPhrase');
        return next;
      });
    } else {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set('searchPhrase', searchQuery);
        return next;
      });
    }

    try {
      dispatch(setSearchPhrase(searchQuery));
      toast.success('Search is done!');
      setIsSearching(false);
    } catch (error) {
      toast.error(error?.message || String(error) || 'Search failed');
    }

    // dispatchSearch();
  };

  // const dispatchSearch = async () => {
  //   try {
  //     await dispatch(
  //       getFilteredRecipes({
  //         searchPhrase,
  //         selectedCategories,
  //         selectedIngredients,
  //         page,
  //         perPage,
  //         append: false,
  //       })
  //     ).unwrap();
  //     toast.success('Search is done!');
  //     setIsSearching(false);
  //   } catch (error) {
  //     toast.error(error?.message || String(error) || 'Search failed');
  //   }
  // };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={formInitialValue}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            <Field
              type="text"
              name="query"
              placeholder="Search recipes"
              className={styles.input}
            />
          </label>
          <button
            type="submit"
            disabled={isSearching}
            className={styles.button}
          >
            {
              /* add a loader? */
              isSearching ? 'Searching...' : 'Search'
            }
          </button>
        </Form>
      </Formik>
    </div>
  );
};
