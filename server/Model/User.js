const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        userId:'',
        name: String,
        image: String,
        email: String,
        about: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", DataSchema);
