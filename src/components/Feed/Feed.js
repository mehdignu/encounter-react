import React, {Component} from 'react';
import CardEvent from './CardEvent/CardEvent';
import Aux from '../../hoc/Aux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import MomentUtils from '@date-io/moment';
import moment from 'moment';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});

let lock = false;

class Feed extends Component {

    state = {
        events: [],

    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!lock) {
            this.onLoadFeed();
            lock = true;
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.onLoadFeed();
    }



    componentDidMount() {

        this.onLoadFeed();

    }

    onLoadFeed() {
        //get all th events to be displayed on the feed
        var a = this;
        axios.get('/api/getFeed')
            .then(function (response) {

                if (response.status === 200) {

                    a.setState({events: response.data.data});

                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {


        const {classes} = this.props;

        let key = 0;
        let eventsFeed = <p>loading events</p>;


        if (this.state.events.length !== 0) {


            eventsFeed = this.state.events

                .filter(x => moment({locale: "de"}).diff(x.date, 'hours') < 0)
                .map(
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

                        for (var i = 0; i < x.requester.length; i++) {
                            if (x.requester[i].userID === this.props.currentUser.user.user.id) {
                                requested = true;
                                break;
                            }
                        }


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
                            eventImg={x.eventImg}
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
        currentUser: state.user,
        currentRequest: state.requests
    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {}
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Feed));

