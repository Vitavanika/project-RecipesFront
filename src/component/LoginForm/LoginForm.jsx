import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import s from '../../pages/AuthPage/AuthPage.module.css';
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
  const authState = useSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => setPasswordVisible(!passwordVisible);
    
    const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch((values)).unwrap();
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err?.message || err?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={s.card}>
      <h1 className={s.title}>Login</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form} noValidate>
            <label className={s.label}>
              <span className={s.labelText}>Enter your email address</span>
              <Field
                className={s.input}
                type="email"
                name="email"
                placeholder="email@gmail.com"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={s.error}
              />
            </label>

            <label className={s.label}>
              <span className={s.labelText}>Create a strong password</span>
              <div className={s.passwordWrapper}>
                <Field
                  className={s.input}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="*********"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={s.eyeButton}
                  onClick={togglePassword}
                >
                  <svg className={s.eyeIcon}>
                    <use
                      href={`${icons}#${passwordVisible ? 'icon-eye-open' : 'icon-eye-crossed'}`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </label>

            <button
              type="submit"
              className={s.submitBtn}
              disabled={isSubmitting || authState.isLoading}
            >
              {authState.isLoading ? 'Logging in...' : 'Login'}
            </button>

            {authState.error && (
              <div className={s.errorServer}>{authState.error}</div>
            )}
          </Form>
        )}
      </Formik>

      <p className={s.hint}>
        Don’t have an account?{' '}
        <Link to="/auth/register" className={s.link}>Register</Link>
      </p>
    </section>
  );
}