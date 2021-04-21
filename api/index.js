const express = require("express"); 

const channelRoutes = require("./routes/channelRoutes");  
const categoriesRoutes = require("./routes/categoriesRoutes");  
const programRoutes = require("./routes/programRoutes");  

//server setup
const app = express(); 
//make sure the server can read the req.boy object
app.use(express.json()); 

//routes setup
app.use("/api/v1/channels", channelRoutes); 
app.use("/api/v1/categories", categoriesRoutes); 
app.use("/api/v1/programs", programRoutes); 

app.listen(3001, (err) => {
  if(err){
    console.log("The server could not start");
    console.log(err);
  }
  console.log("listening on port: 3001");
}); 