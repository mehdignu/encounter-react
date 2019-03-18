const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        title: String,
        description: String,
        location: String,
        date: Number, // timestamp of the date
        time: Number, // timestamp
        admin: Number,
        participants: [Number],
        requester: [Number],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", DataSchema);
