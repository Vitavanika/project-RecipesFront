import { Field, Form, Formik } from 'formik';
import { useSearchParams } from 'react-router';
import { selectLoading } from '../../redux/recipes/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/recipes/operations';
import { toast } from 'react-hot-toast';

import styles from './SearchBox.module.css';

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formInitialValue = { query: searchParams.get('searchPhrase') || '' };
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = async values => {
    if (!values.query) {
      return;
    }
    const searchQuery = values.query.trim();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('searchPhrase', searchQuery);

    setSearchParams(newParams);

    try {
      await dispatch(searchRecipes(Object.fromEntries(newParams))).unwrap();
      toast.success('Search is done!');
    } catch (error) {
      toast.error(error?.message || String(error) || 'Search failed');
    }
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={formInitialValue} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <label className={styles.label}>
            <Field
              type="text"
              name="query"
              placeholder="Search recipes"
              className={styles.input}
            />
          </label>
          <button type="submit" disabled={isLoading} className={styles.button}>
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
