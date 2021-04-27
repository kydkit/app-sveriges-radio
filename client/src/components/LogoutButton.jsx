import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const LogoutButton = () => {
  const history = useHistory();
  const { setLoginState, setUser, setRegResult } = useContext(UserContext);

  const handleOnclick = () => {
    setLoginState(false);
    setUser(undefined);
    setRegResult(null);
    history.push("/login");
  };
  return <p onClick={handleOnclick}>Logout</p>;
};

export default LogoutButton;
