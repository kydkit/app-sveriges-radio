import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Login.module.css";

const Login = (props) => {
  const history = useHistory();
  const { loginUser, loginResult, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    let userToSave = {
      email,
      password,
    };
    loginUser(userToSave);
  };
  let content = "";
  if (user) {
    history.push("/");
  } else {
    content = <div className="noLogin">{loginResult}</div>;
  }

  return (
    <div>
      <form className={styles.container} onSubmit={handleLogIn}>
        <input className={styles.input} type="text" placeholder="email" onChange={handleEmail} />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <button>Log in</button>
        {content}
      </form>
    </div>
  );
};

export default Login;
