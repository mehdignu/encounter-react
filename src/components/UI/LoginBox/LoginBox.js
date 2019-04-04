import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import cls from './LoginBox.scss';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionTypes from '../../../store/actions';
import {default as Chatkit} from "@pusher/chatkit-server";
import * as params from '../../../client_params';
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
/* global gapi */

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: "#3D78CC",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,

    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});
const chatkit = new Chatkit({
    instanceLocator: params.instanceLocator,
    key: params.key
});

class LoginBox extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
        hidden: true
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onLogHide();
        }
    }

    onSignIn = () => {


        var auth2 = gapi.auth2.getAuthInstance();

        var a = this;

        auth2.signIn().then(function () {


            // The ID token you need to pass to your backend:
            var id_token = auth2.currentUser.get().getAuthResponse().id_token;


            axios.post('/api/token', {
                token: id_token
            })
                .then(function (response) {

                        //user is verified
                        if (response.status === 200) {

                            const payload = response.data;

                            const user = response.data.user;
                            const token = response.data.token;

                            // Make a request for a user with a given ID
                            axios.get('/api/getUser', {
                                    params: {
                                        userID: user.id
                                    }
                                    ,
                                    headers: {
                                        'Authorization': `Bearer ${JSON.stringify(token)}`
                                    }
                                }
                            )
                                .then(function (response) {

                                    //add the user if he doesn't exist in the database
                                    if (response.data.data === null) {

                                        console.log('adding new user');

                                        axios.post('/api/addUser', {

                                            userID: user.id,
                                            name: user.name,
                                            image: user.pic,
                                            email: user.email

                                        }, {
                                            headers: {
                                                'Authorization': `Bearer ${JSON.stringify(token)}`
                                            }
                                        })
                                            .then(function (response) {
                                                a.props.onLoginIn();

                                                a.props.onLogHide();

                                                a.props.onFetchUser(payload);

                                                // add user to pusher
                                                chatkit.createUser({
                                                    id: user.id,
                                                    name: user.name,
                                                })
                                                    .then((currentUser) => {

                                                    }).catch((err) => {

                                                });

                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });


                                    } else {
                                        console.log('user exist');

                                        a.props.onLoginIn();
                                        a.props.onLogHide();
                                        a.props.onFetchUser(payload, response.data.data.about);

                                        //get main user notifications and infos
                                        // a.menuEvents();
                                        // a.userRequests();
                                        // a.userNotifications();

                                    }
                                })
                                .catch(function (error) {
                                    // handle error
                                    console.log(error);
                                });


                        }


                    }
                );


        });
    };




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

        const {classes} = this.props;

        if (this.props.logBox === null) {
            return null;
        }
        const showLoginodal = this.props.logBox.hidden ? cls.modalClosed : cls.modalOpen;


        return (
            <div className={showLoginodal}>
                <main ref={this.setWrapperRef} className={classes.main}>
                    <Paper className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>

                        <form className={cls.form}>

                            <div className={cls.g}>

                                <div id="my-signin2" onClick={this.onSignIn} />


                            </div>
                        </form>
                    </Paper>

                </main>
            </div>
        );
    }
}

LoginBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        logBox: state.login,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: (user, about) => dispatch({type: actionTypes.STORE_USER, user: user, about: about}),
        onSaveUserEvents: (events) => dispatch({type: actionTypes.STORE_USER_EVENTS, events: events}),
        onFetchUserRequests: (requester) => dispatch({type: actionTypes.GET_REQUESTS, requester: requester}),
        onFetchUserNotifications: (notification) => dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            notification: notification
        }),
        onLoginIn: () => dispatch({type: actionTypes.USER_SIGNEDIN}),
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT}),
        onLogHide: () => dispatch({type: actionTypes.HIDE}),


    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginBox));
