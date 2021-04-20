const express = require("express"); 

//server setup
const app = express(); 

app.listen(3001, (err) => {
  if(err){
    console.log("The server could not start");
    console.log(err);
  }
  console.log("listening on port: 3001");
}); 