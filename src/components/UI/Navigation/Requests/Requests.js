import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './Requests.scss';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";
import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import {NavLink, withRouter} from 'react-router-dom'
import axios from "axios";
import Aux from "../../../../hoc/Aux";
import MenuItem from "@material-ui/core/MenuItem";
let channeLoaded = false;

const styles = theme => ({

    requestButt: {
        fontSize: 12,
        marginLeft: theme.spacing.unit,
    }
});

class Requests extends Component {
    state = {
        anchorEl: null,
        anchorN: null,
        anchorR: null,
        mobileMoreAnchorEl: null,
        mobileMoreAnchorN: null,
        requests: [],
        requestsNum: 0,
        infos: [],
        infosNum: 0,
    };
    allowUser(userID, eventID) {

        if (this.props.currentUser.user !== null) {


            const token = this.props.currentUser.user.token;

            var a = this;
            //add the room to mongo
            axios.post('/api/allowUserRequest', {

                    userID: userID,
                    eventID: eventID,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.stringify(token)}`
                    }
                })
                .then(function (response) {

                    a.userRequests();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };


    componentWillMount() {
        channeLoaded = false;
    }

    onLoadFeed() {
        //get all th events to be displayed on the feed

        var a = this;
        axios.get('/api/getFeed')
            .then(function (response) {

                if (response.status === 200) {


                    a.props.resetFeed();
                    a.props.getFeed(response.data.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    menuEvents() {

        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;

        axios.get('/api/getUserEvents', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {


                if (response.status === 200 && response.data.data) {

                    a.props.onSaveUserEvents(response.data.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    userRequests() {


        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;


        axios.get('/api/getUserEvents', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {

                if (response.status === 200 && response.data.data) {

                    a.props.onResetRequests();


                    response.data.data.map(
                        x => {

                            if (x.requester.length > 0) {

                                //get user requests

                                a.props.onFetchUserRequests(x.requester);
                            }

                        }
                    );

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    userNotifications() {

        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;


        axios.get('/api/getUserInfos', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {


                if (response.status === 200 && response.data.data) {
                    a.props.onResetNotifications();


                    response.data.data.map(
                        x => {

                            if (x.infos.length > 0) {

                                //get user notifications
                                a.props.onFetchUserNotifications(x.infos);

                            }

                        }
                    );

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {

        const {classes} = this.props;

        if (this.props.currentUser.user !== null && !channeLoaded) {
            this.menuEvents();
            this.userRequests();
            this.userNotifications();
            this.onLoadFeed();

            channeLoaded = true;
        }



        let notifications = (
            <MenuItem onClick={this.handleMenuClose} className={cls.menuItem}>


                <Typography>

                    no requests yet

                </Typography>


            </MenuItem>

        );

        if (this.props.currentUser.isLoggedIn) {


            if (this.props.currentUser.requests.length !== 0) {

                let key = 0;
                notifications = this.props.currentUser.requests.map(
                    s =>

                        s.map((x, i) => {

                            return (
                                <Aux key={key++}>

                                    <div className={cls.notifs}>

                                        <Avatar alt="Remy Sharp" src={x.userPic}
                                                className={cls.requestUsrImg}/>

                                        <Typography>
                                            <NavLink exact
                                                     to={{pathname: '/user/' + x.userID}} className={cls.link}>
                                                {x.userName}
                                            </NavLink>

                                            want to join {x.eventName}

                                        </Typography>



                                        <div className={cls.butts}>

                                            <Button variant="contained" color="primary" size={"small"}
                                                    onClick={() => this.allowUser(x.userID, x.eventID)}
                                                    className={classes.requestButt}>
                                                Add
                                            </Button>

                                            <Button variant="contained" color="secondary" size={"small"}
                                                    onClick={() => this.deleteRequest(x.admin, x.userID, x.eventID)}
                                                    className={classes.requestButt}>
                                                Delete
                                            </Button>

                                        </div>


                                    </div>

                                    <Divider/>
                                </Aux>
                            );
                        })
                );
            }

        }


        return (

            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Paper className={cls.content} elevation={1}>

                        {notifications}

                    </Paper>


                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        {/*create new ads*/}

                    </Grid>
                </Hidden>
            </Grid>

        );
    }
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequests: state.requests,
        locker: state.locker,
        logBox: state.login,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),
        onLogOutReset: () => dispatch({type: actionTypes.RESET}),
        onLogShow: () => dispatch({type: actionTypes.SHOW}),
        onLogHide: () => dispatch({type: actionTypes.HIDE}),
        onSaveUserEvents: (events) => dispatch({type: actionTypes.STORE_USER_EVENTS, events: events}),
        onFetchUserRequests: (requester) => dispatch({type: actionTypes.GET_REQUESTS, requester: requester}),
        onResetRequests: () => dispatch({type: actionTypes.RESET_REQUESTS}),
        onResetNotifications: () => dispatch({type: actionTypes.RESET_NOTIFICATIONS}),
        onFetchUserNotifications: (notification) => dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            notification: notification
        }),
        getFeed: (feed) => dispatch({type: actionTypes.GET_FEED, feed: feed}),
        resetFeed: () => dispatch({type: actionTypes.RESET_FEED}),

    }
};


export default withStyles(styles)(connect(mapStateToProps,
    mapDispatchToProps)(withRouter(Requests)));

