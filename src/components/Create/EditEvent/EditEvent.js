import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import * as actionTypes from "../../../store/actions";

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

let channeLoaded = false;

class CreateForm extends Component {
    state = {
        title: '',
        description: '',
        location: '',
        selectedDate: new Date(),
        selectedTime: new Date(),
        disable: false,
        eventID: '',

    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    handleDateChange = date => {
        this.setState({selectedDate: date});
    };

    handleTimeChange = date => {
        this.setState({selectedTime: date});
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

    handleUpdate = () => {

        if (this.state.title.length !== 0 && this.state.description.length !== 0 && !this.state.disable) {
            this.setState({disable: true});

            var a = this;

            const title = this.state.title;
            const desc = this.state.description;
            const loc = this.state.location;
            const date = this.state.selectedDate.valueOf();
            const time = this.state.selectedTime.valueOf();
            const eventID = this.state.eventID;

            const token = this.props.currentUser.user.token;

            axios.post('/api/updateEvent', {

                    eventID: eventID,
                    title: title,
                    desc: desc,
                    loc: loc,
                    date: date,
                    time: time,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.stringify(token)}`
                    }
                }).then(a.setState({disable: false}))
                .then(a.onLoadFeed())
                .then(a.menuEvents())
                .then(function (response) {

                    if (response.status === 200)
                        a.props.history.push('/');

                })
                .catch(function (error) {
                    console.log(error);
                });

        }


    };

    goHome = () => {
        this.props.history.push('/');
    };

    fetchEventInfos = (id) => {

        var a = this;
        const token = this.props.currentUser.user.token;
        axios.get('/api/getEvent', {
            params: {
                eventID: id
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        })
            .then(function (response) {

                a.setState({loading: false});

                if (response.status === 200) {

                    a.setState({title: response.data.data.title});
                    a.setState({description: response.data.data.description});
                    a.setState({location: response.data.data.location});

                    const eventDate = new MomentUtils({locale: "de"}).date(response.data.data.date);
                    const eventTime = new MomentUtils({locale: "de"}).date(response.data.data.time);

                    a.setState({selectedDate: eventDate});
                    a.setState({selectedTime: eventTime});
                    a.setState({eventID: response.data.data._id});


                }

            })
            .catch(function (error) {
                console.log(error);
            });

    };

    componentWillUnmount() {
        channeLoaded = false;
    }

    render() {


        const {classes} = this.props;


        if (this.props.currentUser.user !== null && !channeLoaded && this.props.match.params.id) {
            this.fetchEventInfos(this.props.match.params.id);
            channeLoaded = true;
        }


        return (

            <Paper className={classes.root} elevation={1}>


                <form className={classes.container} autoComplete="off">

                    <Typography variant="h4">
                        Update Encounter
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
                            onClick={this.handleUpdate}>
                        Update
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

        getFeed: (feed) => dispatch({type: actionTypes.GET_FEED, feed: feed}),
        resetFeed: () => dispatch({type: actionTypes.RESET_FEED}),
        onSaveUserEvents: (events) => dispatch({type: actionTypes.STORE_USER_EVENTS, events: events}),

    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateForm)));
