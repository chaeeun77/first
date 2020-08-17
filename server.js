const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// app.use((req, res) => {
//     res.json({
//         message: 'It works!'
//     })
// })

const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/order')

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