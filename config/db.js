const mongoose = require('mongoose');

//database 연결
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose
    .connect(process.env.MONGO_URI, dboptions)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err.message));
