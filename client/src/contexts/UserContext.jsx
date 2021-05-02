import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [regResult, setRegResult] = useState(null);
  const [loginResult, setLoginResult] = useState(null);
  const [editNameResult, setEditNameResult] = useState(null);

  //use to toggle register or login
  const [toBeLogin, setToBeLogin] = useState(true);

  useEffect(() => {
    whoami();
  }, []);

  //Functionalities for users
  const whoami = async () => {
    let loggedInUser = await fetch("/api/v1/users/whoami");
    loggedInUser = await loggedInUser.json();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    // console.log("who am i", loggedInUser);
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
    // console.log(userToLogin);
    // setUser(userToLogin)

    if (userToLogin.success) {
      // console.log(userToLogin.success);
      setUser(userToLogin);
      console.log("logged in user: ", user);
      setLoginResult(null);
    } else if (userToLogin.error) {
      console.log(loginResult);
      setLoginResult(userToLogin.error);
    }
  };

  const logout = async (user) => {
    await fetch("/api/v1/users/logout");
    // console.log(result.status);
    // if(result.status === 200){
    //   console.log("logout success")
    // }
  };

  const changeName = async (newUsername) => {
    console.log(newUsername);
    let newName = await fetch(`/api/v1/users/changename`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUsername),
    });
    newName = await newName.json();

    if (newName.success) {
      setEditNameResult(newName.success);
    } else if (newName.error) {
      setEditNameResult(newName.error);
    }
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
    loginResult,
    setUser,
    user,
    changeName,
    editNameResult,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
