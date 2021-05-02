import { createContext, useState } from "react";

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

  const deleteFavProgram = async (channelId, userId) => {
    let programToDelete = await fetch(
      `/api/v1/favorites/deletefavprogram/${channelId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    // getUserFavProgram(userId);
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
