import { useState, useContext } from "react";

import { UserContext } from '../contexts/UserContext'; 
import styles from '../css/Register.module.css'


const Register = (props) => {
  const { registerUser, regResult, whoami } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = {
      username, 
      email,
      password
    };
    await whoami(newUser);
    await registerUser(newUser);
  };

  let content = "";
  if (regResult) {
    content = (
      <div className="regResult">
        {regResult}
      </div>
    )
  }

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input className={styles.input} type="text" placeholder="username" onChange={handleUsername} />
        <input className={styles.input} type="text" placeholder="email" onChange={handleEmail} />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <button>Register</button>
        {content}
      </form>
    </div>
  );
};

export default Register;
