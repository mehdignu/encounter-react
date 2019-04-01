import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './ShowEvent.scss';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import axios from "axios";
import * as actionTypes from "../../../store/actions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class ShowEvent extends React.Component {

    handleEventJoin = () => {
        this.props.history.push('/event/' + this.props.eventID);
    };

    handleVisitor = () => {
        if (!this.props.logBox.hidden) {
            this.props.onLogHide();

        } else {
            this.props.onLogShow();

        }
    };


    handleDeleteRequest = () => {

        this.setState({requested: false});

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

                // a.this.props.onRequest();

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

                // a.this.props.onRequest();

            })
            .catch(function (error) {
                console.log(error);
            });

    };


    render() {


        return (

            <Paper className={cls.content} elevation={1}>


                <CardMedia
                    className={cls.eventMedia}
                    image={this.props.image}
                    title="Paella dish"
                />

                <Typography variant="h5" className={cls.title}>
                    {this.props.title}
                </Typography>


                <div className={cls.mainInfo}>

                    <div className={cls.placeInfo}>

                        <IconButton aria-label="Event place" disabled={true} className={cls.straightButt}>


                            <PlaceIcon/>


                        </IconButton>

                        <Typography paragraph>

                            {this.props.loc}

                        </Typography>

                    </div>

                    <div className={cls.timeInfo}>


                        <IconButton aria-label="Event time" disabled={true}>
                            <AccessIcon/>

                        </IconButton>

                        <Typography paragraph>
                            {this.props.date} at {this.props.time}
                        </Typography>
                    </div>
                </div>


                <Typography className={cls.description}>

                    {this.props.description}
                </Typography>


                {(this.props.loggedIn) ?

                    (this.props.allowed) ?

                        <Button onClick={this.handleEventJoin} variant="contained" color="primary"
                                className={cls.joinButt}>
                            join event
                        </Button>

                        :
                        (this.props.requested) ?

                            <Button onClick={this.handleDeleteRequest} variant="contained" color="secondary"
                                    className={cls.joinButt}>
                                request sent
                            </Button>

                            :

                            <Button onClick={this.handleJoinRequest} variant="contained" color="primary"
                                    className={cls.joinButt}>
                                request to join
                            </Button>


                    :

                    <Button onClick={this.handleVisitor} variant="contained" color="primary"
                            className={cls.joinButt}>
                        Request to join
                    </Button>
                }

            </Paper>

        )
    }
}



//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequests: state.requests,
        logBox: state.login,


    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onRequest: () => dispatch({type: actionTypes.INCREMENT}),
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT}),
        onLogShow: () => dispatch({type: actionTypes.SHOW}),
        onLogHide: () => dispatch({type: actionTypes.HIDE}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowEvent));
