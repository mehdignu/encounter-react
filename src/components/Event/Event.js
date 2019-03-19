import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import EventBox from "./EventBox/EventBox";
import EventInfo from "./EventInfo/EventInfo";
import EventAttendees from "./EventAttendees/EventAttendees";
import axios from "axios";
import {NavLink} from "react-router-dom";
import cls from "./Event.scss";
import ListItem from "../UI/Navigation/NavMenu/NavMenu";
import MomentUtils from "@date-io/moment";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});

class Event extends Component {


    state = {

        eventData: null,
        eventID: this.props.match.params.id,
        participants: [],

    };

    fetchEventInfos = (id) => {

        var a = this;
        const eventId = id ? id : this.state.eventID;
        let participantsUsers = [];

        axios.get('/api/getEvent', {
            params: {
                eventID: eventId
            }
        })
            .then(function (response) {

                a.setState({loading: false});

                if (response.status === 200) {

                    a.setState({eventData: response.data.data});
                    console.log(response.data.data);

                    if (a.state.eventData.participants.length > 0) {

                        const participantsFetched = a.state.eventData.participants;

                        for (let i = 0; i < participantsFetched.length; i++) {

                            //get the participant
                            axios.get('/api/getUser', {
                                params: {
                                    userID: participantsFetched[i]
                                }
                            })
                                .then(function (response) {


                                        const userParticipant = {

                                            name: response.data.data.name,
                                            userID: response.data.data.userId,
                                            userImg: response.data.data.image,
                                        };

                                        console.log(userParticipant);
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


            this.fetchEventInfos(nextProps.match.params.id);

        }
    }

    componentDidMount() {

        this.fetchEventInfos();

    }


    render() {

        const {classes} = this.props;


        //load events info
        let eventInfo = <p>loadign event infos</p>;

        let k1 = 0;
        if (this.state.eventData) {

            const eventDate = new MomentUtils({locale: "de"}).date(this.state.eventData.date).format("MMMM Do YYYY");
            const eventTime = new MomentUtils({locale: "de"}).date(this.state.eventData.time).format("H:mm a");

            eventInfo = (

                <EventInfo
                    title={this.state.eventData.title}
                    desc={this.state.eventData.description}
                    loc={this.state.eventData.location}
                    date={eventDate}
                    time={eventTime}
                    key={k1++}
                />
            );


        }


        //load participants info
        let particiPantsInfo = <p>loadign participants infos</p>;

        let k2 = 0;
        if (this.state.participants.length > 0) {

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


                        <EventBox/>

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

export default withStyles(styles)(Event);

