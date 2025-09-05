const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");

// user authentication
async function registerUser(req, res) {
	const { fullName, email, password } = req.body;
	const isUserAlreadyExists = await userModel.findOne({
		email,
	});
	if (isUserAlreadyExists) {
		return res.status(400).json({
			message: "User already exists",
		});
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const user = await userModel.create({
		fullName,
		email,
		password: hashPassword,
	});

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET
	);
	res.cookie("token", token);
	res.status(201).json({
		message: "User registered successfully",
		user: {
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
		},
	});
}
async function loginUser(req, res) {
	const { email, password } = req.body;
	const user = await userModel.findOne({
		email,
	});

	if (!user) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET
	);
	res.cookie("token", token);
	res.status(200).json({
		message: "User logged in successfully",
		user: {
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
		},
	});
}
async function logoutUser(req, res) {
	res.clearCookie("token");
	res.status(200).json({
		message: "User logged out successfully",
	});
}

// foodPartner authentication
async function registerFoodPartner(req, res) {
	const { fullName, email, password, phone, address, contactName } = req.body;

	const isAccountAlreadyExists = await foodPartnerModel.findOne({
		email,
	});

	if (isAccountAlreadyExists) {
		return res.status(400).json({
			message: "Account already exists",
		});
	}

	if(phone.length !== 10){
		return res.status(400).json({
			message: "Phone number should be 10 digits long",
		});
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const foodPartner = await foodPartnerModel.create({
		fullName,
		email,
		password: hashPassword,
		phone,
		address,
		contactName,
	});

	const token = jwt.sign(
		{
			id: foodPartner._id,
		},
		process.env.JWT_SECRET
	);

	res.cookie("token", token);

	res.status(201).json({
		message: "Account registered successfully",
		foodPartner: {
			_id: foodPartner._id,
			name: foodPartner.fullName,
			email: foodPartner.email,
			phone: foodPartner.phone,
			address: foodPartner.address,
			contactName: foodPartner.contactName,
		},
	});
}

async function loginFoodPartner(req, res) {
	const { email, password } = req.body;
	const foodPartner = await foodPartnerModel.findOne({
		email,
	});

	if (!foodPartner) {
		res.status(400).json({
			message: "Invalid email or password",
		});
	}

	const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

	if (!isPasswordValid) {
		res.status(400).json({
			message: "Invalid email or password",
		});
	}

	const token = jwt.sign(
		{
			id: foodPartner._id,
		},
		process.env.JWT_SECRET
	);

	res.cookie("token", token);
	res.status(200).json({
		message: "Account logged in successfully",
		foodPartner: {
			_id: foodPartner._id,
			name: foodPartner.fullName,
			email: foodPartner.email,
		},
	});
}

async function logoutFoodPartner(req, res) {
	res.clearCookie("token");
	res.status(200).json({
		message: "Account logged out successfully",
	});
}

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	registerFoodPartner,
	loginFoodPartner,
	logoutFoodPartner,
};
