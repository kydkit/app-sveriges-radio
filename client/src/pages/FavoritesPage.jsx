import { useContext, useEffect, useState } from "react";

import FavLoggedIn from "../components/FavLoggedIn";
import FavNotLoggedIn from "../components/FavNotLoggedIn";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/FavoritesPage.module.css";

const Favorites = () => {
  const { user, getUserFavChannel, userFavChannel, changeName, whoami } = useContext(
    UserContext
  );
  const { getAllChannels, channels } = useContext(RadioContext);
  const [showForm, setShowForm] = useState(false);
  const [newUsername, setNewUsername] = useState(""); 

  useEffect(() => {
    if (channels && userFavChannel) {
      getAllChannels();
      getUserFavChannel();
    }
    // eslint-disable-next-line
  }, []);
  
  const toggleEdit = () => {
    setShowForm(true);
    setShowForm(!showForm);
  };
  
  const handleNameChange = (e) => {
    setNewUsername(e.target.value); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let newInfo = {
      username: newUsername,
      userId: user.userId
    }
    await changeName(newInfo); 
    setNewUsername("")
    whoami()
    setShowForm(false); 
  }
  
  return (
    <div className={styles.fav}>
      <h1 className={styles.header}>
        {user ? `${user.username}'s favorites` : ""}
        {user ? (
          <div>
            <p className={styles.edittext} onClick={toggleEdit}>
              edit username
            </p>
          </div>
        ) : (
          ""
        )}
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleNameChange}
              className={styles.input}
              type="text"
              placeholder="username"
            />
          </form>
        ) : (
          ""
        )}
      </h1>
      <div className={styles.logincontainer}>
        {user ? <FavLoggedIn /> : <FavNotLoggedIn />}
      </div>
    </div>
  );
};

export default Favorites;
