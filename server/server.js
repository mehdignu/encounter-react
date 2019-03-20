const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./Model/User");
const Event = require("./Model/Event");


const API_PORT = 5000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://mehdi:CPagj5pN6U4jVAf@cluster0-wwkwm.mongodb.net/encounter?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;


db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));


/* ************************** */
/* User database api endpoint */
/* ************************** */


//get user from the database
router.get("/getUser", (req, res) => {

    var userID = req.query.userID;

    User.findOne({"userId": Number(userID)},
        (err, data) => {
            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//add user to the database
router.post("/addUser", (req, res) => {

    let newUser = new User();

    const {userID, name, image, email} = req.body;


    //TODO - check the input for validity

    // if ((!id && id !== 0) || !message) {
    //     return res.json({
    //         success: false,
    //         error: "INVALID INPUTS"
    //     });
    // }

    newUser.userId = Number(userID);
    newUser.name = name;
    newUser.image = image;
    newUser.email = email;
    newUser.about = '';


    newUser.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });

});

//update the user
router.post("/updateUser", (req, res) => {

    const {userID, about} = req.body;

    User.findOneAndUpdate({"userId": Number(userID)}, {"about": about}, err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

//delete the user
router.delete("/deleteUser", (req, res) => {

    const {userID} = req.body;

    User.findOneAndDelete({"userId": Number(userID)}, err => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});

/* ***************************  */
/* Event database api endpoint  */
/* ***************************  */


//get Events feed from the database
router.get("/getFeed", (req, res) => {

    Event.find(
        (err, data) => {


            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//get Eevnt from id
router.get("/getEvent", (req, res) => {

    var eventID = req.query.eventID;

    Event.findOne({
            "_id": eventID
        },
        (err, data) => {


            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//get all user Events
router.get("/getUserEvents", (req, res) => {

    const userID = req.query.userID;

    Event.find({"admin": Number(userID)},
        (err, data) => {

            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});

//add event to the database
router.post("/createEvent", (req, res) => {

    let newEvent = new Event();

    const {title, desc, loc, date, time, admin, adminName, adminPicture} = req.body;


    newEvent.title = title;
    newEvent.description = desc;
    newEvent.location = loc;
    newEvent.date = date;
    newEvent.time = time;
    newEvent.admin = admin;
    newEvent.participants = [admin];
    newEvent.adminName = adminName;
    newEvent.adminPicture = adminPicture;
    newEvent.requester = [];


    newEvent.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });

});

//update event
router.post("/updateEvent", (req, res) => {

    const {eventID, title, desc, loc, date, time} = req.body;

    Event.findOneAndUpdate({"_id": eventID}, {


        "title": title,
        "description": desc,
        "location": loc,
        "date": date,
        "time": time,

    }, err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});


//delete the event
router.delete("/deleteEvent", (req, res) => {

    const {eventID} = req.body;

    console.log(eventID);

    Event.findOneAndDelete({"_id": eventID}, err => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
