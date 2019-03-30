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
import Aux from "../../../hoc/Aux";
import * as actionTypes from "../../../store/actions";


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
});


let chatManager = null;
let channeLoaded = false;

class EventInfo extends React.Component {



    render() {

        const {classes} = this.props;

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

                    {(this.props.admin) ?

                        <Aux>

                            <Button variant="outlined" color="primary" className={classes.button}
                                    onClick={this.props.onEdit}>
                                Edit Event
                            </Button>


                            < Divider/>

                            < Button variant="outlined" color="secondary" className={classes.button}
                                     onClick={this.props.onDelete}>
                                Delete Event
                            </Button>
                        </Aux>
                        :

                        < Button variant="outlined" color="secondary" className={classes.button}
                                 onClick={this.props.onLeave}>
                            Leave Event
                        </Button>
                    }

                </div>


            </Paper>
        );

    };
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        locker: state.locker,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        // onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),
        onIncomingReques: () => dispatch({type: actionTypes.ADD_REQUEST}),


    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(EventInfo)));
