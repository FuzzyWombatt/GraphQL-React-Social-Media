const mongoose = require('mongoose');

const data = require("./default.json");

const db = data.mongoURI;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log('Mongo connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB