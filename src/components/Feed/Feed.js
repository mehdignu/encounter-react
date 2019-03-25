import React, {Component} from 'react';
import CardEvent from './CardEvent/CardEvent';
import Aux from '../../hoc/Aux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import axios from "axios";
import * as actionTypes from "../../store/actions";
import {connect} from "react-redux";
import MomentUtils from '@date-io/moment';
import Snackbar from '../UI/Navigation/Snackbar/SnackbarUI';

/* global gapi */

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});

let channel = null;
let channeLoaded = false;

class Feed extends Component {

    state = {
        events: [],
        loading: true,
        notifications: [],

    };


    componentDidMount() {


        //get all th events to be displayed on the feed
        var a = this;
        axios.get('/api/getFeed')
            .then(function (response) {
                a.setState({loading: false});

                if (response.status === 200) {

                    a.setState({events: response.data.data});

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    render() {

        if (window.pusher !== undefined && !channeLoaded && this.state.events.length !== 0 && this.props.currentUser.user !== null) {
            console.log(this.state.events);
            console.log(this.props.currentUser.user.user.id);
            var a = this;

            channel = window.pusher.subscribe('general-channel');

            this.state.events

                .filter(x => x.admin === this.props.currentUser.user.user.id)

                .map(
                    x => {

                        console.log(x);
                        return (
                            channel.bind(x._id, function (data) {

                                a.setState(prevState => ({
                                    notifications: [...prevState.notifications, data]
                                }))

                            })
                        );
                    }
                );


            channeLoaded = true;

        }


        const {classes} = this.props;

        let key = 0;
        let key2 = 0;
        let eventsFeed = <p>loading events</p>;
        let not = null;


        if (this.state.events.length !== 0) {


            if (this.state.notifications) {

                not = this.state.notifications.map(function (x) {

                    return <Snackbar msg={x.message} key={key2++}/>
                });
            }

            eventsFeed = this.state.events.map(
                x => {

                    const eventDate = new MomentUtils({locale: "de"}).date(x.date).format("MMMM Do YYYY");
                    const eventTime = new MomentUtils({locale: "de"}).date(x.time).format("H:mm a");
                    const eventCreationDate = new MomentUtils({locale: "de"}).date(x.time).format("MMMM Do YYYY");
                    const eventID = x._id;
                    let allowed = null;
                    let loggedIn = null;
                    let requested = null;

                    if (this.props.currentUser.user !== null) {

                        //verify id plz
                        allowed = x.participants.includes(this.props.currentUser.user.user.id);
                        loggedIn = this.props.currentUser.isLoggedIn;
                        requested = x.requester.includes(this.props.currentUser.user.user.id);

                    }


                    return (


                        <CardEvent
                            key={key++}
                            eventID={eventID}
                            title={x.title}
                            description={x.description}
                            locat={x.location}
                            date={eventDate}
                            time={eventTime}
                            eventCreationDate={eventCreationDate}
                            adminName={x.adminName}
                            adminPicture={x.adminPicture}
                            allowed={allowed}
                            admin={x.admin}
                            loggedIn={loggedIn}
                            requested={requested}
                        />


                    );
                }
            );


        }


        return (

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden smDown>

                        <Grid item xs>


                        </Grid>
                    </Hidden>
                    <Grid item xs>

                        <Aux>
                            {not}

                            {eventsFeed}

                        </Aux>
                    </Grid>
                    <Hidden smDown>

                        <Grid item xs>

                            main page ads

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
        currentUser: state.user
    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {}
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Feed));

