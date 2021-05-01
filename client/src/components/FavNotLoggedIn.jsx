import styles from '../css/FavNotLoggedIn.module.css'; 

const favNotLoggedIn = () => {
  return (
    <div className={styles.notloggedin}>
      <img
        src="assets/user.svg"
        alt="member icon"
        className={styles.membericon}
      />
      <p>Wanna add favorites?</p>
      <a href="/login"> Log in now!</a>
    </div>
  );
}
 
export default favNotLoggedIn;