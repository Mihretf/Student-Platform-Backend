//
const authService = require("../services/authService");

//* Register controller

const register = async(req, res) =>{
	try {
		const {username, email, password, role} = req.body;
		const newUser = await authService.registerUser({username, email, password, 
		role});
		const publicUser = {
			_id: newUser._id,
			username: newUser.username,
			email: newUser.email,
			role: newUser.role,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
		};
		res.status(201).json({message: "User registered successfully" , user: publicUser});
		
	} catch (error) {
		res.status(400).json({error: error.message})
		
	}
}

const login = async(req, res) =>{
	try {
		const {email, password} = req.body
	   const { loggedUser, accessToken, refreshToken } = await authService.loginUser({ email, password });
res.status(200).json({ loggedUser, accessToken, refreshToken });

	} catch (error) {
		res.status(401).json({ error: error.message});
		
	}
}
const refresh = async (req, res) =>{
	try {
		const {refreshToken} = req.body
		const { accessToken } = await authService.refreshAccessToken(refreshToken)
		res.status(200).json({accessToken})
		
	} catch (error) {
		res.status(403).json({error: error.message})
		
	}
}

const logout = async (req, res) =>{
	try {
		const {refreshToken} = req.body
		await authService.logoutUser(refreshToken)
		res.status(200).json({message: "Logged out successfully!"})
	} catch (error) {
		res.status(400).json({ error : error.message})
		
	}
}

module.exports={
	logout, 
	refresh, 
	login, 
	register,
}