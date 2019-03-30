import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import EventBox from "./EventBox/EventBox";
import EventInfo from "./EventInfo/EventInfo";
import EventAttendees from "./EventAttendees/EventAttendees";
import axios from "axios";
import {NavLink, withRouter} from "react-router-dom";
import cls from "./Event.scss";
import ListItem from "../UI/Navigation/NavMenu/NavMenu";
import MomentUtils from "@date-io/moment";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {ChatManager, TokenProvider} from "@pusher/chatkit-client";
import {string} from "prop-types";

import InfoIcon from '@material-ui/icons/ChevronRight';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircle from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import Aux from "../../hoc/Aux";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;
let chatManager = null;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        width: '33px',
        height: '33px',
        padding: '0',
        zIndex: '999',
        minHeight: '0',

    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },


    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    menuButtonEvent: {
        marginRight: 20,

        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },


    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        top: '4rem',
        [theme.breakpoints.down('sm')]: {
            top: 0,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },

});
let channeLoaded = false;

class Event extends Component {


    state = {

        eventData: null,
        eventID: this.props.match.params.id,
        participants: [],
        currentPusherUser: null,
        currentRoom: {users: []},
        messages: [],
        users: [],
        mobileOpen: false

    };

    componentWillUnmount() {
        channeLoaded = false;
        this.setState({eventData: null});
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    fetchEventInfos = (id) => {


        var a = this;
        const eventId = id ? id : this.state.eventID;

        const token = this.props.currentUser.user.token;

        //get the events data from the database
        axios.get('/api/getEvent', {
            params: {
                eventID: eventId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        })
            .then(function (response) {


                if (response.status === 200) {

                    a.setState({eventData: response.data.data});

                    if (a.state.eventData.participants.length > 0) {

                        const participantsFetched = a.state.eventData.participants;


                        for (let i = 0; i < participantsFetched.length; i++) {

                            //get the participant
                            axios.get('/api/getUser', {
                                params: {
                                    userID: participantsFetched[i]
                                },
                                headers: {
                                    'Authorization': `Bearer ${JSON.stringify(token)}`
                                }
                            })
                                .then(function (response) {


                                        const userParticipant = {

                                            name: response.data.data.name,
                                            userID: response.data.data.userId,
                                            userImg: response.data.data.image,
                                        };

                                        a.setState(prevState => ({
                                            participants: [...prevState.participants, userParticipant]
                                        }))

                                    }
                                ).catch(function (error) {
                                console.log(error);
                            });

                        }


                    }

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    };


    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.match.params.id !== nextProps.match.params.id) {

            this.setState({participants: []});
            this.fetchEventInfos(nextProps.match.params.id);

        }
    }


    render() {

        const {classes, theme} = this.props;

        //load events info
        let eventInfo = <p>loadign event infos</p>;
        let eventChat = '';
        let eventInfosButton = null;
        let drawer = null;

        let k1 = 0;

        if (this.props.currentUser.user !== null && !channeLoaded) {
            this.fetchEventInfos();
            channeLoaded = true;
        }


        // if (this.state.eventData === null || this.props.currentUser.userID === null) {
        if (this.state.eventData === null || this.state.participants.length < 0) {
            return null;
        }


        const eventDate = new MomentUtils({locale: "de"}).date(this.state.eventData.date).format("MMMM Do YYYY");
        const eventTime = new MomentUtils({locale: "de"}).date(this.state.eventData.time).format("H:mm a");

        const isAdmin = this.state.eventData.admin === this.props.currentUser.user.user.id;


        //load participants info
        let particiPantsInfo = <p>loadign participants infos</p>;

        let k2 = 0;
        if (this.state.participants.length > 0 && this.props.currentUser.user !== null) {

            eventInfo = (

                <EventInfo
                    eventID={this.state.eventData._id}
                    pusherID={this.state.eventData.pusherID}
                    title={this.state.eventData.title}
                    desc={this.state.eventData.description}
                    loc={this.state.eventData.location}
                    date={eventDate}
                    time={eventTime}
                    admin={isAdmin}
                    key={k1++}
                />
            );

            particiPantsInfo = this.state.participants.map(
                x => {

                    return (

                        <EventAttendees
                            name={x.name}
                            profileImg={x.userImg}
                            userID={x.userID}
                            key={k2++}
                        />
                    );

                }
            );

            eventInfosButton = (
                <Fab color="primary" className={classes.fab} onClick={this.handleDrawerToggle}>
                    <InfoIcon/>
                </Fab>
            );


            eventChat = (

                <EventBox
                    userID={this.props.currentUser.user.user.id}
                    eventID={this.state.eventData._id}
                    pusherID={this.state.eventData.pusherID}
                    participants={this.state.participants}
                />

            );

            drawer = (
                <div>
                    <Divider/>
                    <List className={cls.lis}>


                        <List component="div" className={cls.infos}>


                            <Typography className={cls.title}>

                                {this.state.eventData.title}


                            </Typography>


                            <div className={cls.mainInfo}>

                                <div className={cls.placeInfo}>

                                    <IconButton aria-label="Event place" disabled={true} className={cls.straightButt}>


                                        <PlaceIcon/>


                                    </IconButton>
                                    <Typography paragraph>
                                        {this.state.eventData.location}
                                    </Typography>

                                </div>

                                <div className={cls.timeInfo}>


                                    <IconButton aria-label="Event time" disabled={true}>
                                        <AccessIcon/>

                                    </IconButton>

                                    <Typography paragraph>
                                        {eventDate} {eventTime}
                                    </Typography>
                                </div>
                            </div>


                            <Typography className={cls.description}>

                                {this.state.eventData.description}

                            </Typography>

                            <Typography className={cls.membersTitle}>
                                Members
                            </Typography>

                            {particiPantsInfo = this.state.participants.map(
                                x => {

                                    return (

                                        <EventAttendees
                                            name={x.name}
                                            profileImg={x.userImg}
                                            userID={x.userID}
                                            key={k2++}
                                        />
                                    );

                                }
                            )}

                            <Divider/>

                            <div className={cls.butts}>

                                {(this.isAdmin) ?

                                    <Aux>

                                        <Button variant="outlined" color="primary" className={classes.button}
                                                onClick={this.onEdit}>
                                            Edit Event
                                        </Button>


                                        < Divider/>

                                        < Button variant="outlined" color="secondary" className={classes.button}
                                                 onClick={this.onDelete}>
                                            Delete Event
                                        </Button>
                                    </Aux>
                                    :

                                    < Button variant="outlined" color="secondary" className={classes.button}
                                             onClick={this.onLeave}>
                                        Leave Event
                                    </Button>
                                }

                            </div>

                        </List>


                    </List>




                </div>
            );

        }


        return (

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden smDown>

                        <Grid item xs={2}>

                            {eventInfo}

                        </Grid>
                    </Hidden>
                    <Grid item xs>

                        <nav className={classes.drawer}>
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={this.props.container}
                                    variant="temporary"
                                    anchor={'left'}
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>


                            <Hidden smUp implementation="css">
                                {eventInfosButton}
                            </Hidden>
                        </nav>

                        {eventChat}

                    </Grid>
                    <Hidden smDown>

                        <Grid item xs={2}>

                            <Paper className={cls.content} elevation={1}>


                                <ul>

                                    {particiPantsInfo}

                                </ul>


                            </Paper>


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

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        // onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),


    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Event)));

