import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const LogoutButton = (props) => {
  const history = useHistory();
  const { setUser, setRegResult, logout } = useContext(UserContext);

  const handleOnclick =  () => {
    logout(props); 
    setUser(null);
    setRegResult(null);
    history.push("/login");
  };
  return <p onClick={handleOnclick}>Logout</p>;
};

export default LogoutButton;
