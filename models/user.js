
const mongoose=require("mongoose");
const bcrypt= require("bcryptjs");
const config= require("../config/database");


//User schema
const Userschema= mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	events:{
		type: Array,
		required: false
	}
});

const User= module.exports= mongoose.model("User", Userschema);

module.exports.getUserById= function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername= function(username, callback){
	const query= {username: username};
	User.findOne(query, callback);
}

module.exports.addUser= function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if (err) throw err;
			else{
				newUser.password= hash;
				newUser.save(callback);
			}
		});
	});
}

module.exports.comparePassword= function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if (err) throw err;

		else{
			callback(null, isMatch);
		}
	});
}
