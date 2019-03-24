import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './EventInfo.scss';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import {Divider, withStyles} from "@material-ui/core";
import axios from "axios";
import {withRouter} from 'react-router-dom'
import {ChatManager, TokenProvider} from "@pusher/chatkit-client";
import {connect} from "react-redux";


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
});


let chatManager = null;
let channeLoaded = false;

class EventInfo extends React.Component {


    onDelete = (e) => {
        var a = this;
        e.preventDefault();

        const token = this.props.currentUser.user.token;
        axios.delete('/api/deleteEvent',
            {

                data: {eventID: this.props.eventID},

                headers: {
                    'Authorization': `Bearer ${JSON.stringify(token)}`
                }

            }
        )
            .then(function (response) {

                if (response.status === 200) {

                    chatManager.connect()
                        .then(currentUser => {
                            currentUser.deleteRoom({roomId: a.props.pusherID})
                                .then(() => {
                                    console.log(`Deleted room with ID: `);

                                    a.props.history.push('/');

                                })
                                .catch(err => {
                                    console.log(`Error deleted room  ${err}`)
                                })
                        })
                        .catch(err => {
                            console.log('Error on connection', err)
                        });
                }


            })
            .catch(function (error) {
                console.log(error);
            });

    };


    onEdit = () => {
        //TODO - check if the user is the owner of the event before edit

        this.props.history.push('/eventForm/edit/' + this.props.eventID);

    };

    render() {

        const {classes} = this.props;

        if (this.props.currentUser.user !== null && !channeLoaded) {

            chatManager = new ChatManager({
                instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
                userId: this.props.currentUser.user.user.id,
                tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
            });
            channeLoaded = true;
        }

        return (
            <Paper className={cls.content} elevation={1}>


                <Typography variant="h6" className={cls.title}>
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
                            {this.props.date} {this.props.time}
                        </Typography>
                    </div>
                </div>


                <Typography className={cls.description}>

                    {this.props.desc}

                </Typography>


                <div className={cls.butts}>
                    <Button variant="outlined" color="primary" className={classes.button}
                            onClick={this.onEdit}>
                        Edit Event
                    </Button>


                    <Divider/>

                    <Button href="/" variant="outlined" color="secondary" className={classes.button}
                            onClick={this.onDelete}>
                        Delete Event
                    </Button>

                </div>


            </Paper>
        );

    };
}

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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(EventInfo)));
