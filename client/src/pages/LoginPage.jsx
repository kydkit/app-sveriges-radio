import { useContext } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

import { UserContext } from '../contexts/UserContext';

const LoginPage = () => {
  const { toBeLogin, setToBeLogin } = useContext(UserContext);
  const toggle = () => {
    setToBeLogin(!toBeLogin);
  }

  return (
    <div className="loginpage">
      <h1>login/reg page</h1>
      {toBeLogin ? <Login /> : <Register />}
      <p onClick={toggle}>{toBeLogin ? "Click to be a member?" : "Click to go back to log in"}</p>
    </div>
  );
}

export default LoginPage;