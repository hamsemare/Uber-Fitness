//dependencies
const express= require("express");
const path= require("path");
const bodyParser= require("body-parser");
const cors= require("cors");
const passport= require("passport");
const mongoose= require("mongoose");

const app= express();
const port= 3000;

//Start the sever
app.get("/", function(req, res){
	res.send("Invalid Endpoint");
});

app.listen(port, function(){
	console.log("Started server on port: "+ port);
});
