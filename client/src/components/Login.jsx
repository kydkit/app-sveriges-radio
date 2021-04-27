import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = (props) => {
  const history = useHistory();
  const { loginUser, whoami, user, loginState, loginResult } = useContext(
    UserContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    let userToSave = {
      email,
      password,
    };
    await loginUser(userToSave);
    await whoami(userToSave);
  };
  let content = "";
  if (loginState) {
    history.push("/");
  } else {
    content = <div className="noLogin">{loginResult}</div>;
  }

  return (
    <div className="login">
      <form onSubmit={handleLogIn}>
        <input type="text" placeholder="email" onChange={handleEmail} />
        <input
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
