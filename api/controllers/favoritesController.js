const sqlite3 = require("sqlite3");

//This model allows us to make front end fetches from my backend
const fetch = require("node-fetch");

const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../radio.db"));

//User story 9: able to see favorite channel
const saveFavChannel = (req, res) => {
  let favChannel = req.body;
  let query = /*sql*/ `
  INSERT INTO favChannel(channelId, userId)
  VALUES ($channelId, $userId)
  `;
  let params = {
    $channelId: favChannel.channelId,
    $userId: req.session.user.userId
  };
  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Favorite channel has been added" });
  });
};

//User story 9: able to see favorite program
const saveFavProgram = (req, res) => {
  // console.log(req.body);
  let { programId } = req.body;
  let query = /*sql*/ `
  INSERT INTO favProgram(programId, userId)
  VALUES ($programId, $userId)
  `;
  let params = {
    $programId: programId,
    $userId: req.session.user.userId
  };
  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Favorite program has been added" });
  });
};

//User story 10: able to see a tablå/schedule of my fav channels
const getFavChannel = (req, res) => {
  // console.log(req.params);
  let query = /*sql*/ `
  SELECT * FROM favChannel WHERE userId = $userId
  `;
  let params = { $userId: req.session.user.userId };
  //get() gets the first match in the DB.
  //all() gets all
  //must use get all to get all the channels
  db.all(query, params, (err, favChannel) => {
    if (!favChannel) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }
    res.json(favChannel);
  });
};

//able to see a tablå/schedule of my fav programs
//not state as user story 10... but... doing it anyway
const getFavProgram = (req, res) => {
  // console.log(req.params);
  let query = /*sql*/ `
  SELECT * FROM favProgram WHERE userId = $userId
  `;
  let params = { $userId: req.session.user.userId  };
  db.all(query, params, (err, favProgram) => {
    if (!favProgram) {
      res.status(400).json({ error: "Something went wrong" });
      return;
    }
    res.json(favProgram);
  });
};

// DELETE from db
const deleteFavChannel = (req, res) => {
  const { channelId, userId } = req.params; 
  // console.log(userId);
  let query = `DELETE FROM favChannel WHERE channelId = $channelId AND userId = $userId` ; 
  let params = {
    $channelId: channelId,
    $userId: userId
  };
  db.run(query, params); 
  res.send("Channel has been deleted"); 
}

const deleteFavProgram = (req, res) => {
  const { programId, userId } = req.params; 
  // console.log(userId);
  let query = `DELETE FROM favProgram WHERE programId = $programId AND userId = $userId` ; 
  let params = {
    $programId: programId,
    $userId: userId
  };
  db.run(query, params); 
  res.send("program has been deleted"); 
}

module.exports = {
  saveFavChannel,
  saveFavProgram,
  getFavChannel,
  getFavProgram,
  deleteFavChannel,
  deleteFavProgram
};