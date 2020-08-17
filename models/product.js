//1번
const mongoose = require('mongoose')

//2번
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
})

//3번
model.exports = mongoose.model("product", productSchema)