//dependencies
const express= require("express");
const path= require("path");
const bodyParser= require("body-parser");
const cors= require("cors");
const passport= require("passport");
const mongoose= require("mongoose");

const config= require("./config/database")

//Connect to the database
mongoose.connect(config.database);
//// On connection, and log it
mongoose.connection.on("connected", function(){
	console.log("connected to the database "+ config.databse);
});
// On error, and log it
mongoose.connection.on("error", function(err){
	console.log("Database error: "+ err);
});

const app=express();
//Set the port
const port=3000;


//Body parser  Middleware
app.use(bodyParser());
const users= require("./routes/users")

//Allows access our page from different ports
app.use(cors());

//Set static folder to public
app.use(express.static(path.join(__dirname, "public")));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Users for all users accounts
app.use("/users", users);

//Index Route
app.get("/", function(req, res){
})

app.get("*", function(req, res){
	res.sendFile(path.join(__dirname, "public/index.html"))
})

//Start Server
app.listen(port, function(){
})
