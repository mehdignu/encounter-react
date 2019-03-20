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


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
});


class EventInfo extends React.Component {


    onDelete = () => {

        axios.delete('/api/deleteEvent',
            {data: {eventID: this.props.eventID}}
        )
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });


    };


    onEdit = () => {
        //TODO - check if the user is the owner of the event before edit

        this.props.history.push('/eventForm/edit/'+this.props.eventID);

    };

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

export default withStyles(styles)(withRouter(EventInfo));
