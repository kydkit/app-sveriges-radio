import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton'

import { UserContext } from '../contexts/UserContext';
import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const { user } = useContext(UserContext);
  // const [links] = useState([
  //   { name: "CHANNELS", url: "/channels" },
  //   { name: "CATEGORIES", url: "/categories" },
  //   { name: "FAVORITES", url: "/favorites" },
  //   { name: "LOG IN", url: "/login" },
  // ]);

  //Save: Alternative way to map links
  // const renderLinks = () => {
  //   return links.map((link) => (
  //     <Link className={styles.link} key={link.name} to={link.url}>
  //       {link.name}
  //     </Link>
  //   ));
  // };

  return (
    <div className={styles.navbar}>
      {/* {renderLinks()} */}
      <Link className={styles.link} to="/">
        <img src="assets/radio.svg" alt="radio icon" width="30px" />
      </Link>
      <Link className={styles.link} to="/channels">
        Channels
      </Link>
      <Link className={styles.link} to="/categories">
        Categories
      </Link>
      <Link className={styles.link} to="/favorites">
        Favorites
      </Link>
      {user ? <LogoutButton user={user}/> : <LoginButton />}
    </div>
  );
};

export default Navbar;
