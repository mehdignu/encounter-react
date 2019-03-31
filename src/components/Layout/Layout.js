import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Navigation from '../UI/Navigation/Navigation';
import classes from './Layout.scss';
import {connect} from "react-redux";
import Snackbar from '../UI/Navigation/Snackbar/SnackbarUI';

import * as actionTypes from '../../store/actions';
import axios from "axios";
import ShareDialog from "../UI/ShareDialog/ShareDialog";
import Footer from "./Footer/Footer";

let channeLoaded = false;
let channel = null;

class Layout extends Component {


    state = {
        notifications: [],
    };

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

    render() {


        if (window.pusher !== undefined && !channeLoaded && this.props.currentUser.user !== null) {
            var a = this;

            a.onLoadFeed();


            channel = window.pusher.subscribe('general-channel');

            channel.bind(this.props.currentUser.user.user.id, function (data) {

                if (!data.deleted) {

                    a.setState(prevState => ({
                        notifications: [...prevState.notifications, data]
                    }));
                }

                a.onLoadFeed();
                a.menuEvents();
                a.userRequests();
                a.userNotifications();


            });

            channeLoaded = true;

        }


        let not = null;

        let key2 = 0;

        if (this.state.notifications) {


            not = this.state.notifications.map(function (x) {

                return <Snackbar msg={x.message} key={key2++}/>
            });
        }


        return (
            <Aux>


                {not}
                <ShareDialog/>

                <Navigation {...this.props} />


                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        );
    };
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequest: state.requests
    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onIncomingReques: () => dispatch({type: actionTypes.ADD_REQUEST}),
        onSaveUserEvents: (events) => dispatch({type: actionTypes.STORE_USER_EVENTS, events: events}),
        onFetchUserRequests: (requester) => dispatch({type: actionTypes.GET_REQUESTS, requester: requester}),
        onFetchUserNotifications: (notification) => dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            notification: notification
        }),
        onResetRequests: () => dispatch({type: actionTypes.RESET_REQUESTS}),
        onResetNotifications: () => dispatch({type: actionTypes.RESET_NOTIFICATIONS}),

        getFeed: (feed) => dispatch({type: actionTypes.GET_FEED, feed: feed}),
        resetFeed: () => dispatch({type: actionTypes.RESET_FEED}),

    }
};


export default (connect(mapStateToProps, mapDispatchToProps)(Layout));

