const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        title: { type: String, default: "", required: true, maxLength: 150 },
        description: { type: String, default: "", maxLength: 600 },
        image: { type: String, default: "", required: true, maxLength: 255 },
        slug: {
            type: String,
            default: "",
            required: true,
            maxLength: 255,
            unique: true,
        },
    },
    {
        // tự động tạo createdAt, updatedAt
        timestamps: true,
    }
);

module.exports = mongoose.model("blogs", Blog);
