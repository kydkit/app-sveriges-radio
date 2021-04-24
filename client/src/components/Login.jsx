import { useState, useContext } from 'react'; 
import { UserContext } from "../contexts/UserContext"

const Login = (props) => {
  const { loginUser } = useContext(UserContext); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleEmail = (e) => {
    setEmail(e.target.value); 
  }
  
  const handlePassword = (e) => {
    setPassword(e.target.value); 
  }
  
  const handleLogIn = async (e)=> {
    e.preventDefault(); 
    let user = {
      email, 
      password
    }; 

    let result = await loginUser(user); 
  }; 

  return (
    <div className="login">
    <form onSubmit={handleLogIn}>
      <input type="text" placeholder="email" onChange={handleEmail} />
      <input type="password" placeholder="password" onChange={handlePassword} />
      <button>Log in</button>
    </form>
  </div>
  );
}
 
export default Login;