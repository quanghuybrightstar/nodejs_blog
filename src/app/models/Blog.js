const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Blog = new Schema({
    name: { type: String, default: "", required: true, maxLength: 255 },
    description: { type: String, default: "", maxLength: 600 },
    image: { type: String, default: "", required: true, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("blogs", Blog);
