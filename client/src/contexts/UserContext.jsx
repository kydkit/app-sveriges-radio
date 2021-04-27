import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [regResult, setRegResult] = useState(null);
  const [loginResult, setLoginResult] = useState(null);
  const [loginState, setLoginState] = useState(false);
  //use to toggle register or login
  const [toBeLogin, setToBeLogin] = useState(true);

  useEffect(() => {}, []);

  const whoami = async (user) => {
    let loggedInUser = await fetch("/api/v1/users/whoami");
    loggedInUser = await loggedInUser.json();
    if (!loggedInUser) return;
    setUser(loggedInUser);
  };

  const registerUser = async (newUser) => {
    let userToRegister = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    userToRegister = await userToRegister.json();
    // console.log(userToRegister);

    if (userToRegister.success) {
      setRegResult(userToRegister.success);
    } else if (userToRegister.error) {
      setRegResult(userToRegister.error);
    }
  };

  const loginUser = async (user) => {
    let userToLogin = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    userToLogin = await userToLogin.json();
    if (userToLogin.success) {
      setUser(userToLogin);
      setLoginState(true);
      setLoginResult(null);
    } else if (userToLogin.error) {
      console.log(loginResult);
      setLoginResult(userToLogin.error);
    }
  };

  const logout = async () => {
    await fetch("/api/v1/users/logout");
  };

  const values = {
    whoami,
    toBeLogin,
    setToBeLogin,
    registerUser,
    loginUser,
    logout,
    regResult,
    setRegResult,
    loginState,
    setLoginState,
    loginResult,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
