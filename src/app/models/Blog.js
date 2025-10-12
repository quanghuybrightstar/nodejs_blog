const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        sortId: { type: Number },
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
        // auto add createdAt, updatedAt
        timestamps: true,
    }
);
BlogSchema.plugin(AutoIncrement, { inc_field: "sortId" });

// Custom query helpers
BlogSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        return this.sort({
            [req.query.col]: isValidType ? req.query.type : "default",
        });
    }
    return this;
};

// Add plugins
BlogSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("blogs", BlogSchema);
