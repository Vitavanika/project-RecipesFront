import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { selectLoading } from '../../redux/recipes/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/recipes/operations';
import { toast } from 'react-hot-toast';

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formInitialValue = searchParams;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = values => {
    const searchQuerry = values.query.trim();
    if (searchQuerry) {
      setSearchParams({ searchPhrase: searchQuerry });
    }
  };

  useEffect(() => {
    async () => {
      try {
        await dispatch(searchRecipes(searchParams)).unwrap();
        toast.success('Search is done!');
      } catch (error) {
        toast.error(error?.message || String(error) || 'Login failed');
      }
    };
  }, [searchParams, dispatch]);

  return (
    <div>
      <Formik initialValues={formInitialValue} onSubmit={handleSubmit}>
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
