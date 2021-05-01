import { useContext } from "react";

import FavLoggedIn from "../components/FavLoggedIn";
import FavNotLoggedIn from "../components/FavNotLoggedIn";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/FavoritesPage.module.css";

const Favorites = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.fav}>
      <p className={styles.header}>
        {user ? <FavLoggedIn /> : <FavNotLoggedIn />}
      </p>
    </div>
  );
};

export default Favorites;
