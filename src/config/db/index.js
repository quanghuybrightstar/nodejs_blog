// Using Node.js `require()`
const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodejs_blog_dev", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = { connect };
