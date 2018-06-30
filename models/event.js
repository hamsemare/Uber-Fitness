const mongoose=require("mongoose");
const bcrypt= require("bcryptjs");
const config= require("../config/database");


//User schema
const Eventschema= mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	sets: {
		type: Number,
		required: true
	},
	reps:{
		type: Number,
		required: true
	},
	username:{
		type: String,
		required: true
	}
});

const Event= module.exports= mongoose.model("Event", Eventschema);

module.exports.getEventById= function(id, callback){
	Event.findById(id, callback);
}

/*********/
module.exports.addEvent= function(newEvent, callback){
	console.log(newEvent);
	newEvent.save(callback);
}
