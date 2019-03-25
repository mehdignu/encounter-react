const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./Model/User");
const Event = require("./Model/Event");
const Chatkit = require('@pusher/chatkit-server');
const Pusher = require('pusher');
const cors = require('cors');
const googleAuth = require('./googleAuth.js');
const tokenizer = require('./tokenizer.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
const session_check = require("./middleware");
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

//chat manager
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
    key: '898c19ad-e17b-4e2a-9dfb-ecd215327d50:aJRKgR09pI+cPc+hGsT58d0fTEXxmVnoVk50Fs52Y4g=',
});

//pusher notifications instance
var pusher = new Pusher({
    appId: '741209',
    key: 'b3c4b499cc2b3ff03699',
    secret: 'eda0320d9a352b5470b7',
    cluster: 'eu',
    encrypted: true
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
/* User database api endpoint */
/* ************************** */

router.post('/token', (req, res) => {
    try {
        const {token} = req.body;

        googleAuth.getGoogleUser(token)
            .then(response => {
                var content = {
                    token: tokenizer.sign(response, privateKEY),
                    user: response
                };
                return content
            })
            .then(credentials => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(credentials));
            })
            .catch(e => {
                console.log(e);
                throw new Error(e)
            })


    } catch (error) {
        res.sendStatus(500).end(JSON.stringify({error: "Internal server error"}))
        return console.error(error)
    }
});

//get user from the database
router.get("/getUser", session_check, (req, res) => {

    var userID = req.query.userID;

    User.findOne({"userId": userID},
        (err, data) => {
            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//add user to the database
router.post("/addUser", session_check, (req, res) => {

    let newUser = new User();

    const {userID, name, image, email} = req.body;


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
router.post("/updateUser", session_check, (req, res) => {

    const {userID, about} = req.body;

    User.findOneAndUpdate({"userId": userID}, {"about": about}, err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

//delete the user and his events
router.delete("/deleteUser", session_check, (req, res) => {

    const {userID} = req.body;

    User.findOneAndDelete({"userId": userID}, err => {
        if (err) return res.send(err);

        Event.deleteMany({"admin": userID}, err => {
            if (err) return res.send(err);
        });

        chatkit.deleteUser({userId: userID})
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
router.get("/getEvent", session_check, (req, res) => {

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
router.get("/getUserEvents", session_check, (req, res) => {

    const userID = req.query.userID;

    Event.find({"admin": userID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});

//add event to the database
router.post("/createEvent", session_check, (req, res) => {

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
router.post("/updateEvent", session_check, (req, res) => {

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
router.delete("/deleteEvent", session_check, (req, res) => {

    const {eventID} = req.body;

    Event.findOneAndDelete({"_id": eventID}, err => {
        if (err) return res.send(err);

        return res.json({success: true});
    });
});


/* **************************** */
/* Event Notifications endpoint */
/* **************************** */

//handle the request event
router.post("/sendRequest", session_check, (req, res) => {

    const {userID, eventID, eventName, userName, userPic} = req.body;

    //check if the user request already sent
    Event.findOne({
            "_id": eventID
        },
        (err, data) => {


            if (err) return res.json({success: false, error: err});


            let requests = data.requester;

            for (var i = 0; i < requests.length; i++) {
                if (requests[i].userID === userID) {
                    return res.json({success: false, error: "request already sent"});
                }
            }

            const newRequest = {"userID": userID, "userName": userName, "userPic": userPic, "eventName": eventName, "eventID": eventID};


            requests.push(newRequest);

            //update the event requesters
            Event.findOneAndUpdate({"_id": eventID}, {"requester": requests}, err => {
                if (err) return res.json({success: false, error: err});

                //send the notification to the admin of the event
                pusher.trigger('general-channel', eventID, {
                    "message": userName + " want to join " + eventName
                });
                return res.json({success: true});

            });


        });


});

//handle deleting the request event
router.post("/deleteRequest", session_check, (req, res) => {

    const {userID, eventID} = req.body;


    //get the events info to remove the requester
    Event.findOne({"_id": eventID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});

            let requests = data.requester;
            let requesters = [];


            for (var i = 0; i < requests.length; i++) {
                if (requests[i].userID !== userID) {
                   requesters.push(requests[i]);
                }
            }

            //update the event requesters
            Event.findOneAndUpdate({"_id": eventID}, {"requester": requesters}, err => {
                if (err) return res.json({success: false, error: err});
                return res.json({success: true});
            });

        });

});


/* **************************** */
/*     API Configuration        */
/* **************************** */


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
