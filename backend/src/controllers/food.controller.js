const foodModel = require("../models/food.model");
const storageService = require("../service/storage.service");
const {v4:uuid} = require("uuid");
async function createFood(req,res){
    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())

    const foodItem = await foodModel.create({
        name:req.body.name,
        video:fileUploadResult.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })
    res.status(201).json({
        message:"Food item created successfully",
        food:foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message:"Food items fetched successfully",
        food:foodItems
    })
}
module.exports = {createFood,getFoodItems}