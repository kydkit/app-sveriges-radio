import { createContext, useState, useEffect } from 'react'; 
// import { useHistory } from 'react-router-dom'; 

export const UserContext = createContext();

const UserContextProvider = (props) => {
  // const history = useHistory(); 
  const [toBeLogin, setToBeLogin] = useState(true);

  useEffect(() => {
  }, []); 

  const registerUser = async (newUser) => {
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }); 
    result = await result.json(); 
    if(result.success){
      console.log("success");
    } else {
      console.log("no success");
    }
  }

  const loginUser = async (user) => {
    let result = await fetch ("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    result = await result.json(); 
    if(result.success){
      console.log("success");
    } else {
      console.log("no success");
    }
  }

  const logout = async (user) => {
    let result = await fetch("/api/v1/users/logout", {
      method: "GET", 
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify(user),
    })
    if(result.success){
      console.log("logout success");
    }
  }

  const values = {
    toBeLogin,
    setToBeLogin,
    registerUser,
    loginUser, 
    logout
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
)
}

export default UserContextProvider; 