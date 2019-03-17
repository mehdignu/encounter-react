import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import cls from './LoginBox.scss';
import axios from "axios";
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

        auth2.signIn().then(function () {

            var profile = auth2.currentUser.get().getBasicProfile();
            console.log(profile.getName());

            // Make a request for a user with a given ID
            axios.get('/api/getUser', {
                params: {
                    userID: profile.getId()
                }
            })
                .then(function (response) {

                    console.log(response);

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
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    } else {
                        console.log('user exist');
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
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
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

export default withStyles(styles)(LoginBox);
