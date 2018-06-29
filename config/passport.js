//Citations: https://github.com/bradtraversy/meanauthapp/issues/15

//Authentication, register route and authenticate route and a profile route that we protected
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt= require("passport-jwt").ExtractJwt;
const User= require("../models/user");
const config= require("../config/database");

module.exports= function(passport){
	let opts={};
	opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey= config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		User.getUserByUsername(jwt_payload.username, function(err, user){
			if(err){
				return done(err, false);
			}
			if(user)
				return done(null, user);
			else{
				return done(null, false);
			}
		});

		
}));
}
