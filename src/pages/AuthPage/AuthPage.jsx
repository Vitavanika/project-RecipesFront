import { useParams } from 'react-router';
import LoginForm from '../../component/LoginForm/LoginForm.jsx';
import RegistrationForm from '../../component/RegistrationForm/RegistrationForm.jsx';
import css from './AuthPage.module.css';

const AuthPage = () => {
  const { authType } = useParams();

  return (
    <div className={css.authContainer} data-auth={authType}>
      {authType === 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};

export default AuthPage;
