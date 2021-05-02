import { useContext } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "../css/LoginPage.module.css"; 

import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const { toBeLogin, setToBeLogin } = useContext(UserContext);
  const toggle = () => {
    setToBeLogin(!toBeLogin);
  };

  return (
    <div className={styles.loginpage}>
      <h1 className={styles.header}>{toBeLogin ? "Log In" : "Register"}</h1>
      <div className={styles.forms}>{toBeLogin ? <Login /> : <Register />}</div>
      <p className={styles.toggleRegLogin} onClick={toggle}>
        {toBeLogin ? "Click to be a member?" : "Click here to log in"}
      </p>
    </div>
  );
};

export default LoginPage;
