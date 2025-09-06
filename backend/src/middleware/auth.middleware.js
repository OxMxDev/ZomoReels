const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
async function authFoodPartnerMiddleware(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({
			message: "Please login first",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const foodPartner = await foodPartnerModel.findById(decoded.id);
		req.foodPartner = foodPartner;
		next();
	} catch (err) {
		return res.status(401).json({
			message: "Invalid token",
		});
	}
}

async function authUserMiddleware(req, res, next) {
	console.log("Auth middleware called");
	console.log("Cookies received:", req.cookies);

	const token = req.cookies.token;

	if (!token) {
		console.log("No token found in cookies");
		return res.status(401).json({
			message: "Please login first",
		});
	}

	try {
		console.log("Token found, verifying...");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Token decoded:", decoded);

		const user = await userModel.findById(decoded.id);
		console.log("User found:", user ? "Yes" : "No");
		console.log("User details:", user);

		if (!user) {
			console.log("User not found in database");
			return res.status(401).json({
				message: "User not found",
			});
		}

		req.user = user;
		next();
	} catch (err) {
		console.log("Token verification failed:", err.message);
		return res.status(401).json({
			message: "Invalid token",
		});
	}
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
