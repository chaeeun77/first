//1번
const mongoose = require('mongoose')

//2번
const userSchema = mongoose.Schema()

//3번
module.exports = mongoose.model("user", userSchema)