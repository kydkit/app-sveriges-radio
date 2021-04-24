const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../radio.db"));

//Route handles 
const whoami = (req, res) => {
  //if user exists we get back user. if not we get null
  res.json(req.session.user || null); 
}

//user story 8, be able to log in
const login = (req, res) => {
  // let rootUser = {
  //   username: "Root",
  // };

  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };
  // let user = null;
  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    req.body.password = Encrypt.encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      res.json({ success: "Login successful", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

//not a user story but should have
const logout = (req, res) => {
  delete req.session.user; 
  res.json({ success: "Logout Succesful"})
}

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
    }
  });

  userToRegister.password = Encrypt.encrypt(userToRegister.password);
  query = /*sql*/ `INSERT INTO users (email, password) VALUES ($email, $password)`;
  params = {
    $email: userToRegister.email,
    $password: userToRegister.password,
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      // throw new Error(err); 
      return;
    }

    res.json({ success: "User register successful", lastID: this.lastID });
  });
};

//Export the different route handlers
module.exports = { whoami, login, logout, register }; 