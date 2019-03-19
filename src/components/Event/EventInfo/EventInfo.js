import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './EventInfo.scss';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';

const EventInfo = (props) => (

    <Paper className={cls.content} elevation={1}>


        <Typography variant="h6" className={cls.title}>
            {props.title}
        </Typography>


        <div className={cls.mainInfo}>

            <div className={cls.placeInfo}>

                <IconButton aria-label="Event place" disabled={true} className={cls.straightButt}>


                    <PlaceIcon/>


                </IconButton>
                <Typography paragraph>
                    {props.loc}
                </Typography>

            </div>

            <div className={cls.timeInfo}>


                <IconButton aria-label="Event time" disabled={true}>
                    <AccessIcon/>

                </IconButton>

                <Typography paragraph>
                    {props.date} {props.time}
                </Typography>
            </div>
        </div>


        <Typography className={cls.description}>

            {props.desc}

        </Typography>


    </Paper>

);

export default EventInfo;
