import { createContext, useState, useEffect } from "react";
export const FavoritesContext = createContext();

const FavoritesContextProvider = (props) => {
  const [userFavChannel, setUserFavChannel] = useState(null);
  const [userFavProgram, setUserFavProgram] = useState(null);

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

  const getUserFavChannel = async () => {
    let fav = await fetch(`/api/v1/favorites/getfavchannel`);
    fav = await fav.json();
    console.log(userFavChannel);
    setUserFavChannel(fav);
  };

  const getUserFavProgram = async () => {
    let fav = await fetch(`/api/v1/favorites/getfavprogram`);
    fav = await fav.json();
    setUserFavProgram(fav);
    // console.log(userFavProgram);
  };

  const deleteFavChannel = async (channelId, userId) => {
    await fetch(`/api/v1/favorites/deletefavchannel/${channelId}/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    getUserFavChannel(userId);
  };

  const deleteFavProgram = async (programId, userId) => {
    await fetch(`/api/v1/favorites/deletefavprogram/${programId}/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    getUserFavProgram(userId);
  };

  const values = {
    storeFavChannel,
    storeFavProgram,
    getUserFavChannel,
    userFavProgram,
    getUserFavProgram,
    userFavChannel,
    deleteFavChannel,
    deleteFavProgram,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
