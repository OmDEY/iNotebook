const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017')
    // .then(()=>{
    //     console.log("Connected to MongoDB");
    //   })
    //   .catch(()=>{
    //     console.log("Couldn't connect to MongoDB");
    //   })
}

module.exports = connectToMongo