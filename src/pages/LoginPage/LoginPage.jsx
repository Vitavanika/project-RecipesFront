// "/login"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../../redux/auth/slice'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import s from './LoginPage.module.css';

// SVG
import icons from '../../images/icons.svg';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required field'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required field'),
});
 

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  return (
    <main className={s.page}>
      <section className={s.card}>
        <h1 className={s.title}>Login</h1>

       <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginUser(values))
              .unwrap()
              .then(() => {
              toast.success('Login successful!');
              navigate('/');
              })
              .catch((err) => {
              toast.error(err || 'Login failed');
              })
              .finally(() => setSubmitting(false));
  }}
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
                className={s.submit}
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
                  <a href="#" className={s.link}>Register</a>
        </p>
      </section>
    </main>
  );
}