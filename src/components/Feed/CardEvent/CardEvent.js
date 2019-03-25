import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import Aux from '../../../hoc/Aux';
import cls from './CardEvent.scss';
import CardMenu from "../../UI/CardMenu/CardMenu";
import {withRouter} from 'react-router-dom'
import EventMsg from "../../Event/EventBox/EventBox";
import {connect} from "react-redux";
import axios from "axios";
import * as actionTypes from "../../../store/actions";

const styles = theme => ({
    card: {

        [theme.breakpoints.down('sm')]: {
            maxWidth: 400,
            marginBottom: 18,
        },

        maxWidth: 545,
        marginBottom: 18,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        width: '100%',
    },
    input: {
        display: 'none',
    },
    straightButt: {
        paddingLeft: 0,
    },

});

class CardEvent extends Component {
    state = {
        expanded: false,
        eventID: this.props.eventID
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    handleEventJoin = () => {
        this.props.history.push('/event/' + this.state.eventID);
    };

    handleVisitor = () => {
        console.log('bo');
    };


    handleDeleteRequest = () => {

        const userID = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;
        const eventID = this.props.eventID;
        const admin = this.props.admin;

        //add the room to mongo
        axios.post('/api/deleteRequest', {
                admin: admin,
                userID: userID,
                eventID: eventID,

            },
            {
                headers: {
                    'Authorization': `Bearer ${JSON.stringify(token)}`
                }
            })
            .then(function (response) {

                // a.props.onRequest();

            })
            .catch(function (error) {
                console.log(error);
            });
    };


    handleJoinRequest = () => {

        var a = this;
        const eventName = this.props.title;
        const admin = this.props.admin;
        const userID = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;
        const eventID = this.props.eventID;
        const userName = this.props.currentUser.user.user.name;
        const userPic = this.props.currentUser.user.user.pic;

        //add the room to mongo
        axios.post('/api/sendRequest', {

                admin: admin,
                userID: userID,
                eventID: eventID,
                eventName: eventName,
                userName: userName,
                userPic: userPic

            },
            {
                headers: {
                    'Authorization': `Bearer ${JSON.stringify(token)}`
                }
            })
            .then(function (response) {

                // a.props.onRequest();

            })
            .catch(function (error) {
                console.log(error);
            });

    };

    render() {
        const {classes} = this.props;


        return (

            <Aux>
                <Typography variant="h5" className={cls.eventDate}>
                    {this.props.date}
                </Typography>
                <hr align="left"/>

                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar alt={this.props.adminName} src={this.props.adminPicture}
                                    className={classes.avatar}/>
                        }
                        action={
                            <CardMenu/>

                        }
                        title={this.props.adminName}
                        subheader={this.props.eventCreationDate}
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    />
                    <CardContent>

                        <Typography variant="h6" gutterBottom>
                            {this.props.title}
                        </Typography>

                        <div className={cls.mainInfo}>

                            <IconButton aria-label="Event place" disabled={true} className={classes.straightButt}>


                                <PlaceIcon/>


                            </IconButton>
                            <Typography paragraph>
                                {this.props.locat}
                            </Typography>

                            <IconButton aria-label="Event time" disabled={true}>
                                <AccessIcon/>

                            </IconButton>

                            <Typography paragraph>
                                {this.props.time}
                            </Typography>

                        </div>

                        <Typography component="p">
                            {this.props.description}
                        </Typography>


                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>


                    </CardActions>


                    {(this.props.loggedIn) ?

                        (this.props.allowed) ?

                            <Button onClick={this.handleEventJoin} variant="contained" color="primary"
                                    className={classes.button}>
                                join event
                            </Button>

                            :
                            (this.props.requested) ?

                                <Button onClick={this.handleDeleteRequest} variant="contained" color="primary"
                                        className={classes.button}>
                                    request sent
                                </Button>

                                :

                                <Button onClick={this.handleJoinRequest} variant="contained" color="primary"
                                        className={classes.button}>
                                    request to join
                                </Button>


                        :

                        <Button onClick={this.handleVisitor} variant="contained" color="primary"
                                className={classes.button}>
                            Request to join visitor
                        </Button>
                    }


                </Card>

            </Aux>
        );
    }
}

CardEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequests: state.requests,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onRequest: () => dispatch({type: actionTypes.INCREMENT})

    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(CardEvent)));
