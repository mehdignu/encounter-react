const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        title: String,
        description: String,
        location: String,
        date: Number, // timestamp of the date
        time: Number, // timestamp
        admin: String,
        adminName: String,
        adminPicture: String,
        participants: [],
        requester: [],
        pusherID: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("Event", DataSchema);
