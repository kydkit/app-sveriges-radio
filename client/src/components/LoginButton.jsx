import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const history = useHistory();

  const handleOnclick = () => {
    history.push("/login");
  };
  return <p onClick={handleOnclick}>Login</p>;
};

export default LoginButton;
