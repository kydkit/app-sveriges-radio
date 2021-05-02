import { useContext, useEffect } from "react";

import FavLoggedIn from "../components/FavLoggedIn";
import FavNotLoggedIn from "../components/FavNotLoggedIn";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/FavoritesPage.module.css";

const Favorites = () => {
  const { user, getUserFavChannel, userFavChannel } = useContext(UserContext);
  const { getAllChannels, channels } = useContext(RadioContext);

  useEffect(() => {
    if (channels && userFavChannel) {
      getAllChannels();
      getUserFavChannel();
    }
        // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.fav}>
        <h1 className={styles.header}>
          {user ? `${user.username}'s favorites` : ""}
        </h1>
      <div className={styles.logincontainer}>

      {user ? <FavLoggedIn /> : <FavNotLoggedIn />}
      </div>
    </div>
  );
};

export default Favorites;
