import { Field, Form, Formik } from 'formik';
import { useSearchParams } from 'react-router';
import { selectLoading } from '../../redux/recipes/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredRecipes } from '../../redux/recipes/operations';
import { toast } from 'react-hot-toast';

import styles from './SearchBox.module.css';
import { setSearchPhrase } from '../../redux/filters/slice';
import { getSearchPhrase } from '../../redux/filters/selectors';

export const SearchBox = () => {
  const [, setSearchParams] = useSearchParams();
  const searchPhrase = useSelector(getSearchPhrase);
  const formInitialValue = { query: searchPhrase || '' };
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = values => {
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

    dispatch(setSearchPhrase(searchQuery));

    dispatchSearch();
  };

  const dispatchSearch = async () => {
    try {
      await dispatch(getFilteredRecipes()).unwrap();
      toast.success('Search is done!');
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
        <Form>
          <label>
            <Field type="text" name="query" placeholder="Search recipes" />
          </label>
          <button type="submit" disabled={isLoading}>
            {
              /* add a loader? */
              isLoading ? 'Searching...' : 'Search'
            }
          </button>
        </Form>
      </Formik>
    </div>
  );
};
