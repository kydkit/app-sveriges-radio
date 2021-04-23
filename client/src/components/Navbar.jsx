import { useState } from 'react';
import { Link } from 'react-router-dom';

//styles
import styles from '../css/Navbar.module.css'

const Navbar = () => {
  // eslint-disable-next-line
  const [links, setLinks] = useState([
    {name: "CHANNELS", url: "/channels"}, 
    // {name: "PROGRAMS", url: "/programs"},
    {name: "CATEGORIES", url: "/categories"},
    {name: "FAVORITES", url: "/favorites"},
    {name: "LOG IN", url: "/login"}
  ])

  const renderLinks = () => {
    
    return links.map((link) => (
      <Link className={styles.link} key={link.name} to={link.url}>
        {link.name}
      </Link>
    ))
  }

  return(
    <div className={styles.navbar}>
      <span>logo</span>
      {renderLinks()}
    </div>
  );
}

export default Navbar;