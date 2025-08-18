// this service would
// register a user: check if a user with the same user already exists, hash the password using bcrypt, create a new user in the db, and return the created user or just gives a message. 
//login a user: find the user in the db by email, compare the provided pswrd with the stored hash using bcrypt.compare, generate 
//refresh an access token: verify the provided token, make sure the token matches the one stored in our db, generate a new access tokem and return it to the controller
//logout a user: remove the refresh token from the db, return a sucess flag to the controller
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/User");
// const { emit } = require('process');

// Fallback secrets for development if env vars are missing
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'dev_access_token_secret_change_me';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_token_secret_change_me';
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
	console.warn("JWT secrets missing in environment; using development defaults. Set ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in .env.");
}

// the following function is used to generate our access and refresh tokens
const generateTokens = (user) =>{
	const accessToken = jwt.sign({id: user._id, role: user.role}, accessTokenSecret, {expiresIn:"15m"}) ;

	const refreshToken = jwt.sign({id: user._id}, refreshTokenSecret, {expiresIn:"7d"}
);
	return { accessToken, refreshToken };
}

// ** Resgister user

const registerUser = async ({username, email, password, role}) =>{
	const exisiting = await User.findOne({email});
if(exisiting) throw new Error("Email already in use"); // checking if a user with the same email already exists

	const hashedPassword = await bcrypt.hash(password, 10); // hashing our password using bcrypt

	const newUser = await User.create({username, email, password:hashedPassword, role}); // creating a new user in MongoDB

	return newUser;

		

}



// ** logging in a user

const loginUser = async ({email, password}) =>{
	const loggedUser = await User.findOne({email}).select("+password");
	if(!loggedUser) throw new Error("User not found"); // checking if a user with the same email already exists

	const valid = await bcrypt.compare(password, loggedUser.password);
	if(!valid) throw new Error("Invalid credentials")

	const {accessToken, refreshToken} = generateTokens(loggedUser); // we're calling the above function which will create a short lived access token and long-lived refresh token

	loggedUser.refreshToken = refreshToken;
	await loggedUser.save(); // after loggin in, we attach the refresh token to the user record in our db, which means only this user has this refresh token, then saves it

	const publicUser = {
		_id: loggedUser._id,
		username: loggedUser.username,
		email: loggedUser.email,
		role: loggedUser.role,
	};

	return {loggedUser: publicUser, accessToken, refreshToken}
	// then we return the above things for our controller, first: the user's details minus pswrd, second: used for API requests until expires, third: used to request new access token when the old one expires
}
// ** Refresh Access token
const refreshAccessToken = async (refreshToken) =>{
	if (!refreshToken) throw new Error("Refresh token required");

	const tokenUser = await User.findOne({refreshToken});
	if(!tokenUser) throw new Error("Invalid refresh token"); // recive the refreshToken from the controller and find the use assocaited with that refresh token in the db

	jwt.verify(refreshToken, refreshTokenSecret);

	const newAccessToken = jwt.sign({id: tokenUser._id, role: tokenUser.role}, accessTokenSecret, {expiresIn:"15m"}) // generate  new access token since the earlier one has expired
	return {accessToken: newAccessToken};
}

//** logout a user
const logoutUser = async (refreshToken) =>{
	const user = await User.findOne({refreshToken});
	if(!user) throw new Error("User not found");

user.refreshToken = null;
await user.save(); // receive the refresh token from the controller, find the user in the db with that token, and set it to null

return {success: true};
}

module.exports = {
	registerUser,
	loginUser,
	refreshAccessToken,
	logoutUser,

}