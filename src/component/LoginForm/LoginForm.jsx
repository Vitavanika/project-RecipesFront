import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { logIn } from '../../redux/auth/operations';
import { selectAuthIsLoading } from '../../redux/auth/selectors';
import css from '../../pages/AuthPage/AuthPage.module.css';
import icons from '/sprite.svg';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required field'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required field'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const dataToSend = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await dispatch(logIn(dataToSend)).unwrap();
      localStorage.setItem('authToken', response.accessToken);
      toast.success('Login successful!');
      navigate('/');
      resetForm();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={css.card}>
      <h1 className={css.title}>Login</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form} noValidate>
            <label className={css.label}>
              <span className={css.labelText}>Enter your email address</span>
              <Field
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
                type="email"
                name="email"
                placeholder="email@gmail.com"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span className={css.labelText}>Create a strong password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="*********"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={togglePassword}
                >
                  <svg className={css.eyeIcon}>
                    <use
                      href={`${icons}#${passwordVisible ? 'icon-eye-open' : 'icon-eye-crossed'}`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.hint}>
        Don’t have an account?{' '}
        <Link to="/auth/register" className={css.link}>Register</Link>
      </p>
    </section>
  );
}
