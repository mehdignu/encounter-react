import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import ShowEvent from "./ShowEvent/ShowEvent";
import * as actionTypes from "../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";
import MomentUtils from "@date-io/moment";

let lock = false;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});

class Show extends React.Component {


    state = {

        eventData: null

    };

    fetchEventInfos = () => {

        var a = this;
        const eventId = this.props.match.params.id;
        console.log(eventId);


        //get the events data from the database
        axios.get('/api/getEventToShow', {
            params: {
                eventID: eventId
            }
        })
            .then(function (response) {


                if (response.status === 200) {


                    a.setState({eventData: response.data.data});

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    };

componentWillUnmount() {
    lock = false;
}

    componentWillUpdate(nextProps, nextState, nextContext) {

        if (this.props.match.params.id !== null && !lock) {

            this.fetchEventInfos();
            lock = true;
        }

    }

    render() {
        const {classes} = this.props;

        if (this.props.match.params.id !== null && !lock) {

            this.fetchEventInfos();
            lock = true;
        }

        if (this.state.eventData === null) {
            return null;
        }

        const eventDate = new MomentUtils({locale: "de"}).date(this.state.eventData.date).format("dddd, MMMM Do YYYY");
        const eventTime = new MomentUtils({locale: "de"}).date(this.state.eventData.time).format("H:mm a");
        const imgDefault = this.state.eventData.eventImg ? this.state.eventData.eventImg : "https://res.cloudinary.com/drtbzzsis/image/upload/q_auto:low/v1553716807/michael-discenza-199756-unsplash.jpg";

        let allowed = false;
        let loggedIn = false;
        let requested = false;

        if (this.props.currentUser.user !== null && this.state.eventData.participants !== undefined) {


            //verify id plz
            this.allowed = this.state.eventData.participants.includes(this.props.currentUser.user.user.id);
            this.loggedIn = this.props.currentUser.isLoggedIn;

            for (var i = 0; i < this.state.eventData.requester.length; i++) {
                if (this.state.eventData.requester[i].userID === this.props.currentUser.user.user.id) {
                    requested = true;
                    break;
                }
            }


        }


        return (

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden smDown>

                        <Grid item xs={2}>


                        </Grid>
                    </Hidden>
                    <Grid item xs>

                        <ShowEvent

                            title={this.state.eventData.title}
                            description={this.state.eventData.description}
                            image={imgDefault}
                            time={eventTime}
                            date={eventDate}
                            loc={this.state.eventData.location}
                            allowed={this.allowed}
                            loggedIn={this.loggedIn}
                            requested={this.requested}
                            eventID={this.props.match.params.id}

                        />

                    </Grid>
                    <Hidden smDown>

                        <Grid item xs={2}>

                            {/*show new ads*/}

                        </Grid>
                    </Hidden>
                </Grid>
            </div>


        );

    }

}


//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {

        onUpdateUser: (about) => dispatch({type: actionTypes.UPDATE_USER, about: about}),
        onDeleteUser: () => dispatch({type: actionTypes.RESET}),

    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Show)));


