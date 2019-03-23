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
        backgroundColor: theme.palette.secondary.main,
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
    instanceLocator: "v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762",
    key: "898c19ad-e17b-4e2a-9dfb-ecd215327d50:aJRKgR09pI+cPc+hGsT58d0fTEXxmVnoVk50Fs52Y4g="
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

            //TODO - hide the login box when clicked outside of the component
            // console.log('clicked outside of the component');

        }
    }

    onSignIn = () => {


        var auth2 = gapi.auth2.getAuthInstance();

        var a = this;

        auth2.signIn().then(function () {

            var profile = auth2.currentUser.get().getBasicProfile();

            // Make a request for a user with a given ID
            axios.get('/api/getUser', {
                params: {
                    userID: profile.getId()
                }
            })
                .then(function (response) {

                    //add the user if he doesn't exist in the database
                    if (response.data.data === null) {

                        console.log('adding new user');

                        axios.post('/api/addUser', {

                            userID: profile.getId(),
                            name: profile.getName(),
                            image: profile.getImageUrl(),
                            email: profile.getEmail()

                        })
                            .then(function (response) {
                                a.props.onLoginIn();

                                let user = [{
                                    "userId": profile.getId(),
                                    "name": profile.getName(),
                                    "image": profile.getImageUrl(),
                                    "email": profile.getEmail()
                                }];


                                a.props.onFetchUser(user[0]);


                                // add user to pusher
                                chatkit.createUser({
                                    id: profile.getId(),
                                    name: profile.getName(),
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

                        let user = [{
                            "userId": profile.getId(),
                            "name": profile.getName(),
                            "image": profile.getImageUrl(),
                            "email": profile.getEmail()
                        }];


                        a.props.onFetchUser(user[0]);


                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });


        });
    };

    render() {

        const {classes} = this.props;

        const showLoginodal = this.props.hidden ? cls.modalClosed : cls.modalOpen;


        return (
            <div className={showLoginodal}>
                <main ref={this.setWrapperRef} className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>

                        <form className={classes.form}>

                            <div className="g-signin2" onClick={this.onSignIn}
                                 data-onsuccess="onSignIn"/>

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

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: (user) => dispatch({type: actionTypes.STORE_USER, user: user}),
        onLoginIn: () => dispatch({type: actionTypes.USER_SIGNEDIN}),
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT}),


    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginBox));
