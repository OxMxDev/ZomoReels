const express = require("express");
const router = express.Router();
const foodPartnerController = require("../controllers/food-partner.controller")
const authMiddleware = require("../middleware/auth.middleware")


// /api/foodPartner/:id
router.get("/:id",authMiddleware.authFoodPartnerMiddleware,foodPartnerController.getFoodPartnerById)
module.exports = router;