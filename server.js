const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app.use((req, res) => {
//     res.json({
//         message: 'It works!'
//     })
// })

const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/order')

//database 연결
const dbaddress = "mongodb+srv://chaeeun:codms13579@cluster0.0h26j.mongodb.net/first?retryWrites=true&w=majority"
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbaddress, dboptions)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err.message));
//connect에 있는 db주소에 연결이 되면 then으로 가고 에러가 되면 catch로 가라.


//middle wear 설정
app.use(morgan('dev'));

//bodyparser에 대한 middle wear 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//router
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

const PORT = 5000;
app.listen(PORT, console.log('server start'));