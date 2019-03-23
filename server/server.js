const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./Model/User");
const Event = require("./Model/Event");
const Chatkit = require('@pusher/chatkit-server');
const cors = require('cors');


/* ************************** */
/* App Configurations */
/* ************************** */

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


const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
    key: '898c19ad-e17b-4e2a-9dfb-ecd215327d50:aJRKgR09pI+cPc+hGsT58d0fTEXxmVnoVk50Fs52Y4g=',
});


let db = mongoose.connection;


db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger("dev"));


/* ************************** */
/* Messaging endpoint */
/* ************************** */

// app.post('/message', (req, res) => {
//     const payload = req.body;
//     pusher.trigger('chat', 'message', payload);
//     res.send(payload)
// });


/* ************************** */
/* User database api endpoint */
/* ************************** */


//get user from the database
router.get("/getUser", (req, res) => {

    var userID = req.query.userID;

    User.findOne({"userId": userID},
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

    newUser.userId = userID;
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

    User.findOneAndUpdate({"userId": userID}, {"about": about}, err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

//delete the user and his events
router.delete("/deleteUser", (req, res) => {

    const {userID} = req.body;

    User.findOneAndDelete({"userId": userID}, err => {
        if (err) return res.send(err);

        Event.deleteMany({"admin": userID}, err => {
            if (err) return res.send(err);
        });

        chatkit.deleteUser({ userId: userID })
            .then(() => {
                console.log('User deleted successfully');
            }).catch((err) => {
            console.log(err);
        });

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

    Event.find({"admin": userID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});

//add event to the database
router.post("/createEvent", (req, res) => {

    let newEvent = new Event();

    const {title, desc, loc, date, time, admin, adminName, adminPicture, pusherID} = req.body;


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
    newEvent.pusherID = pusherID;


    newEvent.save((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, EvendID: data._id});
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

    Event.findOneAndDelete({"_id": eventID}, err => {
        if (err) return res.send(err);

        return res.json({success: true});
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
