//1번
const mongoose = require('mongoose');

//2번
const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', //reference를 product model 로 했으므로 product id로 타입을 지정하겠다!
        required : true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

//3번
module.exports = mongoose.model("order", orderSchema)