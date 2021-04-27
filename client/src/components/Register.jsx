import { useState, useContext } from "react";

import { UserContext } from '../contexts/UserContext'

const Register = (props) => {
  const { registerUser, regResult, whoami } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = {
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
    <div className="register">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" onChange={handleEmail} />
        <input
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
