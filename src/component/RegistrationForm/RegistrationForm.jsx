import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import icons from '/sprite.svg';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required field'),
  name: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(16, 'Maximum 16 characters')
    .required('Required field'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(128, 'Maximum 128 characters')
    .required('Required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required field'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const dataToSend = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log('Sending data:', values);

    try {
      await dispatch(register(dataToSend)).unwrap();
      toast.success('Registration successful!');
      navigate('/');
      resetForm();
    } catch (rejectedValueOrSerializedError) {
      toast.error(
        rejectedValueOrSerializedError.message || 'Registration failed'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.card}>
      <h1 className={css.title}>Register</h1>
      <p className={css.subtitle}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <label className={css.label}>
              <span className={css.labelText}>Enter your email address</span>
              <Field
                className={css.input}
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
              <span className={css.labelText}>Enter your name</span>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Max"
                autoComplete="name"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>

            <label className={css.label}>
              <span className={css.labelText}>Create a strong password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={css.input}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="*********"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={togglePassword}
                >
                  <svg className={css.eyeIcon}>
                    <use
                      href={`${icons}#${
                        passwordVisible ? 'icon-eye-open' : 'icon-eye-crossed'
                      }`}
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

            <label className={css.label}>
              <span className={css.labelText}>Repeat your password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={css.input}
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="*********"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={toggleConfirmPassword}
                >
                  <svg className={css.eyeIcon}>
                    <use
                      href={`${icons}#${
                        confirmPasswordVisible
                          ? 'icon-eye-open'
                          : 'icon-eye-crossed'
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.checkboxLabel}>
              <Field type="checkbox" name="terms" />I agree to the Terms of
              Service and Privacy Policy
            </label>

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.hint}>
        Already have an account?{' '}
        <Link to="/auth/login" className={css.link}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
