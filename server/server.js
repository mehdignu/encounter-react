const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./Model/User");
const Event = require("./Model/Event");
const Chatkit = require('@pusher/chatkit-server');
const Pusher = require('pusher');
const cors = require('cors');
const googleAuth = require(__dirname + '/googleAuth.js');
const tokenizer = require(__dirname + '/tokenizer.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync(__dirname + '/keys/private.key', 'utf8');
const session_check = require("./middleware");
const path = require('path');
const multer = require("multer");
const cloudinary = require("cloudinary");
const fileUploadMiddleware = require(__dirname + "/fileUploadMiddleware");
const constants = require('./server_params');

/* ************************** */
/* App Configurations */
/* ************************** */

const API_PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://mehdi:CPagj5pN6U4jVAf@cluster0-wwkwm.mongodb.net/encounter?retryWrites=true&ssl=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

//chat manager
const chatkit = new Chatkit.default({
    instanceLocator: constants.instanceLocator,
    key: constants.key,
});

//pusher notifications instance
var pusher = new Pusher({
    appId: constants.appId,
    key: constants.keyPusher,
    secret: constants.secret,
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


router.get("/getUserID", session_check, (req, res) => {

    var userID = req.query.userID;

    if (err) return res.json({success: false, error: err});
    return res.json({success: true, userID: userID});
});


router.get("/getUserEvent", session_check, (req, res) => {

    var userID = req.query.userID;

    User.findOne({"userId": userID}, {name: 1, userId: 1, image: 1, about: 1, _id: 0},
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

        pusher.trigger('general-channel', userID, {
            "message": "user about is updated"
        });

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


//get Eevnt from id to Show
router.get("/getEventToShow", (req, res) => {

    var eventID = req.query.eventID;

    Event.findOne({
            "_id": eventID
        }, { pusherID: 0},
        // }, {participants: 0, requester: 0, pusherID: 0},
        (err, data) => {


            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//get all user Events
router.get("/getUserEvents", session_check, (req, res) => {

    const userID = req.query.userID;

    Event.find({"participants": userID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});


//get all user Events
router.get("/getUserInfos", session_check, (req, res) => {

    const userID = req.query.userID;

    User.find({"userId": userID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});
            return res.json({success: true, data: data});
        });
});

//add event to the database
router.post("/createEvent", session_check, (req, res) => {

    let newEvent = new Event();

    const {title, desc, loc, date, time, admin, adminName, adminPicture, pusherID, eventImg} = req.body;


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
    newEvent.eventImg = eventImg;


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


//leave event
router.post("/leaveEvent", session_check, (req, res) => {

    const {userID, eventID} = req.body;


    //get the events info to remove the requester
    Event.findOne({"_id": eventID},
        (err, data) => {

            if (err) return res.json({success: false, error: err});


            //update the participants section
            let participantsAll = data.participants;
            var found = false;

            if (participantsAll.includes(userID)) {
                var index = participantsAll.indexOf(userID);
                if (index > -1) {
                    found = true;
                    participantsAll.splice(index, 1);
                }
            }

            if (found) {

                //update the event requesters
                Event.findOneAndUpdate({"_id": eventID}, {
                    "participants": participantsAll
                }, err => {
                    if (err) return res.json({success: false, error: err});

                    pusher.trigger('general-channel', userID, {
                        deleted: true
                    });


                    return res.json({success: true});
                });
            } else {
                if (err) return res.json({success: false, error: "user not found"});

            }

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

    const {admin, userID, eventID, eventName, userName, userPic} = req.body;

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

            const newRequest = {
                "admin": admin,
                "userID": userID,
                "userName": userName,
                "userPic": userPic,
                "eventName": eventName,
                "eventID": eventID
            };


            requests.push(newRequest);

            //update the event requesters
            Event.findOneAndUpdate({"_id": eventID}, {"requester": requests}, err => {
                if (err) return res.json({success: false, error: err});

                //send the notification to the admin of the event
                pusher.trigger('general-channel', admin, {
                    "message": userName + " want to join " + eventName
                });

                //send the notification to the user to update his butt
                pusher.trigger('general-channel', userID, {
                    "deleted": true
                });
                return res.json({success: true});

            });


        });


});


//clearInfos
router.post("/clearInfos", session_check, (req, res) => {

    const {userID} = req.body;

    //check if the user request already sent
    User.findOneAndUpdate({"userId": userID}, {"infos": []}, err => {

        if (err) return res.json({success: false, error: err});

        return res.json({success: true});

    });

});

//handle deleting the request event
router.post("/deleteRequest", session_check, (req, res) => {

    const {admin, userID, eventID} = req.body;


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

                //send the notification to the admin of the event
                pusher.trigger('general-channel', admin, {
                    deleted: true
                });

                //send the notification to the user to update his butt
                pusher.trigger('general-channel', userID, {
                    "deleted": true
                });

                return res.json({success: true});
            });

        });

});


//handle adding the user requested to the event
router.post("/allowUserRequest", session_check, (req, res) => {

    const {userID, eventID} = req.body;


    //get the event to remove the user from requester and add him to the participants
    Event.findOne({"_id": eventID},
        (err, data) => {

            //acceptance message
            const eventTitle = data.title;

            let adminName = '';
            let adminPic = '';
            let msg = '';

            if (err) return res.json({success: false, error: err});

            //update the requesters section - remove the user from the requesters
            let requests = data.requester;
            let requesters = [];

            let found = false;
            for (var i = 0; i < requests.length; i++) {
                if (requests[i].userID !== userID) {
                    requesters.push(requests[i]);
                } else {
                    found = true;
                    adminName = requests[i].userName;
                    adminPic = requests[i].userPic;
                }
            }

            //update the participants section
            let participantsAll = data.participants;

            if (!participantsAll.includes(userID)) {
                participantsAll.push(userID);
            }

            if (found === true) {

                //update the event requesters
                Event.findOneAndUpdate({"_id": eventID}, {
                    "requester": requesters,
                    "participants": participantsAll
                }, err => {
                    if (err) return res.json({success: false, error: err});


                    //persist the notification into the admin database
                    User.findOne({"userId": userID},
                        (err, data) => {

                            if (err) return res.json({success: false, error: "cant update the user success message"});

                            let infos = [];

                            const accepted = {
                                "eventTitle": eventTitle,
                                "adminName": adminName,
                                "adminPic": adminPic
                            }

                            msg = adminName + " accepted your request to join " + eventTitle


                            infos = data.infos;
                            infos.push(accepted);


                            //update the user with the new notification info
                            User.findOneAndUpdate({"userId": userID}, {"infos": infos}, err => {
                                if (err) return res.json({success: false, error: err});

                                //send the notification to the admin of the event
                                pusher.trigger('general-channel', userID, {
                                    "message": msg
                                });
                                return res.json({success: true});

                            });

                        });

                });
            } else {
                if (err) return res.json({success: false, error: "request not found"});

            }

        });

});


/* your servrer init and express code here */

cloudinary.config({
    cloud_name: constants.cloud_name,
    api_key: constants.api_key,
    api_secret: constants.api_secret
});

/**
 * Multer config for file upload
 */

const storage = multer.memoryStorage();
const upload = multer({storage});
router.post('/files', upload.single('file'), fileUploadMiddleware, (req, res) => {

    return res.json({success: true, data: res});

});

/* **************************** */
/*     API Configuration        */
/* **************************** */

// app.use(express.static(path.join(__dirname + '/app/build/index.html')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/app/build/index.html'));
// });

app.use("/api", router);
app.use(express.static(path.join(__dirname, '/../build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

app.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
})
