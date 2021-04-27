import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton'

import { UserContext } from '../contexts/UserContext';
import styles from "../css/Navbar.module.css";

const Navbar = () => {
  const { loginState } = useContext(UserContext);
  const [links] = useState([
    { name: "CHANNELS", url: "/channels" },
    { name: "CATEGORIES", url: "/categories" },
    { name: "FAVORITES", url: "/favorites" },
    { name: "LOG IN", url: "/login" },
  ]);

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
      <span>logo</span>
      {/* {renderLinks()} */}
      <Link className={styles.link} to="/channels">CHANNELS</Link>
      <Link className={styles.link} to="/categories">CATEGORIES</Link>
      <Link className={styles.link} to="/favorites">FAVORITES</Link>
      {loginState ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Navbar;
