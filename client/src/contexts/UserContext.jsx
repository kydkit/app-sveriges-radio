import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [regResult, setRegResult] = useState(null);
  const [loginResult, setLoginResult] = useState(null);
  const [userFavChannel, setUserFavChannel] = useState(null);
  const [userFavProgram, setUserFavProgram] = useState(null); 
  

  //use to toggle register or login
  const [toBeLogin, setToBeLogin] = useState(true);

  useEffect(() => {
    whoami();
  }, []);

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

  

  // Functionality for favorites //
  const storeFavChannel = async (favToSave) => {
    let fav = await fetch("/api/v1/favorites/savefavchannel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favToSave),
    });
    fav = await fav.json();
    console.log(fav);
  };

  const storeFavProgram = async (favToSave) => {
    let fav = await fetch("/api/v1/favorites/savefavprogram", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favToSave),
    });
    fav = await fav.json();
    console.log(fav);
  };

  const getUserFavChannel = async (userId) => {
    let fav = await fetch(`/api/v1/favorites/getfavchannel/${userId}`);
    fav = await fav.json();
    setUserFavChannel(fav);
    // console.log(userFavChannel);
  };

  const getUserFavProgram = async (userId) => {
    let fav = await fetch(`/api/v1/favorites/getfavprogram/${userId}`); 
    fav = await fav.json(); 
    setUserFavProgram(fav); 
    console.log(userFavProgram);
  }

  const deleteFavChannel = async (channelId, userId) => {
    await fetch(`/api/v1/favorites/deletefavchannel/${channelId}/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    }); 
    getUserFavChannel(userId); 
  }

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
    storeFavChannel,
    storeFavProgram,
    getUserFavChannel,
    userFavProgram,
    getUserFavProgram,
    userFavChannel,
    deleteFavChannel
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
