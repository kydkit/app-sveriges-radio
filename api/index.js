const express = require("express"); 
const session = require("express-session"); 
const path = require("path"); 

//Radio Routes
const channelRoutes = require("./routes/channelRoutes");  
const categoriesRoutes = require("./routes/categoriesRoutes");  
const programRoutes = require("./routes/programRoutes");  
//userRoutes
const userRoutes = require("./routes/userRoutes"); 

//server setup
const app = express(); 
//make sure the server can read the req.boy object
app.use(express.json()); 

// Express-session setup (comes later). Express-session adds a property to the request object named req.session.
app.use(session({
  // The secret is required and it is used to sign the session ID cookie. Can either be a string or an array of strings. This should be extacted to its own file, it could be a json-file and it should also be gitignored.
  secret: "Ice cream",
  // resave forces the session to be saved back to the session store, even if the session was never modified during the request.
  resave: false,
  // saveUninitialized forces the session to be saved to the store. A session is uninitialized when it is new but not modified
  saveUninitialized: true,
  // Settings object for the session ID cookie, there are many settings you can do, most of the are not required, see the docs for more info. We only need the secure-option in this case. We set this to "auto" in order to enable epress-session to automatically match the determined security of the connection.
  cookie: { secure: "auto" },
})); 

//radio routes setup
app.use("/api/v1/channels", channelRoutes); 
app.use("/api/v1/categories", categoriesRoutes); 
app.use("/api/v1/programs", programRoutes); 
//user routes setup
app.use("/api/v1/users", userRoutes); 

// Serve static files, makes the frontend files "available" to the backend
app.use(express.static(path.join(__dirname, "../build")));

app.listen(3001, (err) => {
  if(err){
    console.log("The server could not start");
    console.log(err);
  }
  console.log("listening on port: 3001");
}); 