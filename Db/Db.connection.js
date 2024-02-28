const mongoose = require('mongoose');

exports.ConnectToDb = async () => {
    try {
        await mongoose.connect(process.env.localURL);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
}
