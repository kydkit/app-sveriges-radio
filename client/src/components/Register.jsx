import { useState, useContext } from "react";

import { UserContext } from '../contexts/UserContext'

const Register = (props) => {
  const { registerUser } = useContext(UserContext); 
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

    //ABLE TO GET REGISTER TO STORE IN DB. 
    //BUT IF USER ALREAY EXIST???
    await registerUser(newUser); 
  };

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
      </form>
    </div>
  );
};

export default Register;
