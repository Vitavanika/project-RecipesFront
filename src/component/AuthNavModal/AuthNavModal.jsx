import { NavLink } from 'react-router';

export const AuthNavModal = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="closeModal">
        X
      </button>
      <p>Please log in or register to access your account.</p>
      <NavLink to="auth/login" onClick={onClick}>
        Log in
      </NavLink>
      <NavLink to="auth/register" onClick={onClick}>
        Register
      </NavLink>
    </div>
  );
};
