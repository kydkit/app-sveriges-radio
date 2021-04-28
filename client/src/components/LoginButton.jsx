import { useHistory } from "react-router-dom";
import styles from '../css/LoginButton.module.css'

const LoginButton = () => {
  const history = useHistory();

  const handleOnclick = () => {
    history.push("/login");
  };
  return <p className={styles.loginbutton} onClick={handleOnclick}>Login</p>;
};

export default LoginButton;
