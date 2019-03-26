import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import EventBox from "./EventBox/EventBox";
import EventInfo from "./EventInfo/EventInfo";
import EventAttendees from "./EventAttendees/EventAttendees";
import axios from "axios";
import {NavLink, withRouter} from "react-router-dom";
import cls from "./Event.scss";
import ListItem from "../UI/Navigation/NavMenu/NavMenu";
import MomentUtils from "@date-io/moment";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {ChatManager, TokenProvider} from "@pusher/chatkit-client";
import {string} from "prop-types";

let chatManager = null;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});
let channeLoaded = false;

class Event extends Component {


    state = {

        eventData: null,
        eventID: this.props.match.params.id,
        participants: [],
        currentPusherUser: null,
        currentRoom: {users: []},
        messages: [],
        users: []

    };

    componentWillUnmount() {
        channeLoaded = false;
        this.setState({eventData: null});
    }

    fetchEventInfos = (id) => {


        var a = this;
        const eventId = id ? id : this.state.eventID;

        const token = this.props.currentUser.user.token;

        //get the events data from the database
        axios.get('/api/getEvent', {
            params: {
                eventID: eventId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        })
            .then(function (response) {


                if (response.status === 200) {

                    a.setState({eventData: response.data.data});

                    if (a.state.eventData.participants.length > 0) {

                        const participantsFetched = a.state.eventData.participants;


                        for (let i = 0; i < participantsFetched.length; i++) {

                            //get the participant
                            axios.get('/api/getUser', {
                                params: {
                                    userID: participantsFetched[i]
                                },
                                headers: {
                                    'Authorization': `Bearer ${JSON.stringify(token)}`
                                }
                            })
                                .then(function (response) {


                                        const userParticipant = {

                                            name: response.data.data.name,
                                            userID: response.data.data.userId,
                                            userImg: response.data.data.image,
                                        };

                                        a.setState(prevState => ({
                                            participants: [...prevState.participants, userParticipant]
                                        }))

                                    }
                                ).catch(function (error) {
                                console.log(error);
                            });

                        }


                    }

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    };



    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.match.params.id !== nextProps.match.params.id) {

            this.setState({participants: []});
            this.fetchEventInfos(nextProps.match.params.id);

        }
    }



    render() {

        const {classes} = this.props;

        //load events info
        let eventInfo = <p>loadign event infos</p>;
        let eventChat = <p>loadign chat</p>;

        let k1 = 0;

        if (this.props.currentUser.user !== null && !channeLoaded) {
            this.fetchEventInfos();
            channeLoaded = true;
        }


        // if (this.state.eventData === null || this.props.currentUser.userID === null) {
        if (this.state.eventData === null || this.state.participants.length < 0) {
            return null;
        }


        const eventDate = new MomentUtils({locale: "de"}).date(this.state.eventData.date).format("MMMM Do YYYY");
        const eventTime = new MomentUtils({locale: "de"}).date(this.state.eventData.time).format("H:mm a");




        //load participants info
        let particiPantsInfo = <p>loadign participants infos</p>;

        let k2 = 0;
        if (this.state.participants.length > 0 && this.props.currentUser.user !== null) {

            eventInfo = (

                <EventInfo
                    eventID={this.state.eventData._id}
                    pusherID={this.state.eventData.pusherID}
                    title={this.state.eventData.title}
                    desc={this.state.eventData.description}
                    loc={this.state.eventData.location}
                    date={eventDate}
                    time={eventTime}
                    admin={this.state.eventData.admin === this.props.currentUser.user.user.id}
                    key={k1++}
                />
            );

            particiPantsInfo = this.state.participants.map(
                x => {

                    return (

                        <EventAttendees
                            name={x.name}
                            profileImg={x.userImg}
                            userID={x.userID}
                            key={k2++}
                        />
                    );

                }
            );


            eventChat = (

                <EventBox
                    userID={this.props.currentUser.user.user.id}
                    eventID={this.state.eventData._id}
                    pusherID={this.state.eventData.pusherID}
                    participants={this.state.participants}
                />

            );

        }


        return (

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden smDown>

                        <Grid item xs={2}>

                            {eventInfo}

                        </Grid>
                    </Hidden>
                    <Grid item xs>

                        {eventChat}

                    </Grid>
                    <Hidden smDown>

                        <Grid item xs={2}>

                            <Paper className={cls.content} elevation={1}>


                                <ul>

                                    {particiPantsInfo}

                                </ul>


                            </Paper>


                        </Grid>
                    </Hidden>
                </Grid>
            </div>


        );

    };
};


//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        // onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),


    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Event)));

