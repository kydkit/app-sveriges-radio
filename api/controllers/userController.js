const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../radio.db"));

//Route handles
const whoami = (req, res) => {
  //if user exists we get back user. if not we get null
  // console.log("who am i from backend: ", req.session.user);
  res.json(req.session.user || null);
};

//user story 8, be able to log in
const login = (req, res) => {
  let userToLogin = req.body;
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToLogin.email };

  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(400).json({ error: "Bad credentials" });
      return;
    }
    userToLogin.password = Encrypt.encrypt(userToLogin.password);
    if (userInDB.password === userToLogin.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      res.json({ success: "Login successful", loggedInUser: userInDB });
      return;
    } else {
      res.status(400).json({ error: "Bad credentials" });
      return;
    }
  });
};

//not a user story but should have
const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Succesful" });
};

//User story 7, be able to register an account
const register = (req, res) => {
  let userToRegister = req.body;

  // Before trying to register the user, lets find out if the user already exists
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      res.status(400).json({ error: "User with that email already exists" });
      return;
    } else {
      userToRegister.password = Encrypt.encrypt(userToRegister.password);
      query = /*sql*/ `INSERT INTO users (username, email, password) VALUES ($username, $email, $password)`;
      params = {
        $username: userToRegister.username,
        $email: userToRegister.email,
        $password: userToRegister.password
      };

      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        } else {
          res.json({
            success: "User register successful. Please log in to continue",
            lastID: this.lastID,
          });
        }
      });
    }
  });
};

const changename = (req, res) => {
  // console.log(req.body);
  const { username, userId } = req.body;

  let newInfo = {
    username: username,
    userId: userId,
  }

  let query = /*sql*/ `UPDATE users SET username = $username WHERE userId = $userId`; 
  let params = {
    $username: req.body.username,
    $userId: req.body.userId
  };
  db.run(query, params, function(err) {
    //in order to update name on front end, session has to be updated with new info
    req.session.user = newInfo;
    // console.log(req.session.user);
    if(err) {
      res.status(400).json({ error: err }); 
      return; 
    }
    res.json({ success: "Username has been updated", changes: this.changes }); 
  })
}

//Export the different route handlers
module.exports = { whoami, login, logout, register, changename };
