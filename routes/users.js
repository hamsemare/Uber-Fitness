const express= require("express");
const router= express.Router();
const User= require("../models/user");
const Event= require("../models/event");
const passport= require("passport");
const jwt= require("jsonwebtoken");
const config= require("../config/database");

router.post("/register", function(req, res, next){
	let newUser= new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.getUserByUsername(newUser.username, function(err, user){
		if(err) throw err;
		if (!user){
			User.addUser(newUser, function(err, user){
				if(err){
					res.json({success: false, msg: "failed to register user."});
				}
				else{
					res.json({success: true, msg: "User registered"});
				}
			});
		}

		else{
			return res.json({success: false, msg:"Username Exists"});
		}
	});

});



router.post("/authenticate", function(req, res, next){
	const username= req.body.username;
	const password= req.body.password;

	User.getUserByUsername(username, function(err, user){
		if(err) throw err;
		if (!user){
			return res.json({success: false, msg:"User not found"});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if (err) throw err;
			else if (isMatch){
				const token= jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 604800 // Expires in 1 week
				});

				res.json({
					success: true,
					token: "JWT "+ token,
					user:{
						id: user._id,
						name: user._name,
						username: user._usernmae,
						password: user._password
					}
				});
			}
			else{
				res.json({
					success: false,
					msg: "Wrong Password"
				});
			}
		});
	});
});


router.get("/profile", passport.authenticate("jwt", {session:false}), function(req, res, next){
	res.json({user: req.user});
});




router.post("/addEvent", function(req, res, next){
	let newEvent= new Event({
		username: req.body.username,
		name: req.body.name,
		weight: req.body.weight,
		date: req.body.date,
		reps: req.body.reps,
		sets: req.body.sets
	});

	Event.addEvent(newEvent, function(err, event){
			if(err){
				res.json({success: false, msg: "failed to"});
			}
			else{
				res.json({success: true, msg: "Added"});
			}
	});
});

router.get('/events', function(req, res, next) {
	var eventList=[];
	var allEvents={};

	Event.find({}, function(err, events) {
	 events.forEach(function(event) {
		 eventList.push(event);
	 });
	 res.json(eventList);
 });
});



module.exports= router;
