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

        if (window.pusher !== undefined && !channeLoaded) {

            channel = window.pusher.subscribe('my-channel');
            channel.bind('my-event', function (data) {
                alert(JSON.stringify(data));
            });

            channeLoaded = true;

        }


        const {classes} = this.props;

        let key = 0;
        let eventsFeed = <p>loading events</p>;


        if (this.state.events.length !== 0 && this.props.currentUser !== null) {

            eventsFeed = this.state.events.map(
                x => {

                    const eventDate = new MomentUtils({locale: "de"}).date(x.date).format("MMMM Do YYYY");
                    const eventTime = new MomentUtils({locale: "de"}).date(x.time).format("H:mm a");
                    const eventCreationDate = new MomentUtils({locale: "de"}).date(x.time).format("MMMM Do YYYY");
                    const eventID = x._id;
                    const allowed = x.participants.includes(this.props.currentUser.userID);

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

