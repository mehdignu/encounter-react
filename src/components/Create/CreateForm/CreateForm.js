import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {connect} from "react-redux";
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';
import {ChatManager, TokenProvider} from "@pusher/chatkit-client";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        padding: theme.spacing.unit,
        width: '100%',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },

    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
    input: {
        display: 'none',
    },
    headerNew: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'

    },
    grid: {
        width: '60%',
        margin: 'auto',
    },
});

let chatManager = null;

class CreateForm extends Component {
    state = {
        title: '',
        description: '',
        location: '',
        selectedDate: new Date(),
        selectedTime: new Date(),

    };


    componentDidMount() {

        chatManager = new ChatManager({
            instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
            userId: '105466931476929488142',
            tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
        });

    }


    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    handleDateChange = date => {
        this.setState({selectedDate: date});
    };

    handleTimeChange = date => {
        this.setState({selectedTime: date});
    };

    handleCreation = (e) => {

        if (this.state.title.length !== 0 && this.state.description.length !== 0) {


            var a = this;

            const title = this.state.title;
            const desc = this.state.description;
            const loc = this.state.location;
            const date = this.state.selectedDate.valueOf();
            const time = this.state.selectedTime.valueOf();
            const admin = this.props.currentUser.userID;
            const adminName = this.props.currentUser.name;
            const adminPicture = this.props.currentUser.profileImage;

            //add the room to pusher
            chatManager.connect()
                .then(currentUser => {
                    console.log(currentUser);
                    currentUser.createRoom({creatorId: admin, name: title})
                        .then((x) => {

                            //add the room to mongo
                            axios.post('/api/createEvent', {

                                title: title,
                                desc: desc,
                                loc: loc,
                                date: date,
                                time: time,
                                admin: admin,
                                adminName: adminName,
                                adminPicture: adminPicture,
                                pusherID: x.id,

                            })
                                .then(function (response) {


                                    a.props.history.push('/');

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });


                        })
                        .catch(err => {
                            console.log(`Error deleted room  ${err}`)
                        })
                })
                .catch(err => {
                    console.log('Error on connection', err)
                });

            e.preventDefault();

        }


    };

    goHome = () => {
        this.props.history.push('/');
    };

    render() {
        const {classes} = this.props;

        return (

            <Paper className={classes.root} elevation={1}>


                <form className={classes.container} autoComplete="off">

                    <Typography variant="h4">
                        Create new Encounter
                    </Typography>

                    <TextField
                        id="standard-name"
                        label="Encounter title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                        required={true}
                    />


                    <TextField
                        id="standard-name"
                        label="Description"
                        className={classes.textField}
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        margin="normal"
                    />

                    <TextField
                        id="standard-name"
                        label="Location"
                        className={classes.textField}
                        value={this.state.location}
                        onChange={this.handleChange('location')}
                        margin="normal"
                        required
                    />

                    <MuiPickersUtilsProvider utils={MomentUtils}>

                        <Grid container className={classes.grid} justify="space-around">
                            <DatePicker
                                margin="normal"
                                label="Date"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                            />
                            <TimePicker
                                margin="normal"
                                label="Time"
                                value={this.state.selectedTime}
                                onChange={this.handleTimeChange}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>


                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.handleCreation}>
                        Create
                    </Button>

                    <Button onClick={this.goHome} variant="outlined" color="primary" className={classes.button}>
                        Back
                    </Button>

                </form>

            </Paper>

        );
    }
}

CreateForm.propTypes = {
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
        // onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),


    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateForm)));
