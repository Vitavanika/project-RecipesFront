import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import styles from './SearchBox.module.css';
import { setSearchPhrase } from '../../redux/filters/slice';
import { getSearchPhrase } from '../../redux/filters/selectors';

export const SearchBox = () => {
  const searchPhrase = useSelector(getSearchPhrase);
  const formInitialValue = { query: searchPhrase || '' };
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = values => {
    setIsSearching(true);
    const searchQuery = values.query.trim();

    try {
      dispatch(setSearchPhrase(searchQuery));
      toast.success('Search is done!');
      setIsSearching(false);
    } catch (error) {
      toast.error(error?.message || String(error) || 'Search failed');
    }
  };

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
