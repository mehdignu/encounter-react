var Int32 = require('mongoose-int32');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        userId:{ type: Number},
        name: String,
        image: String,
        email: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", DataSchema);
