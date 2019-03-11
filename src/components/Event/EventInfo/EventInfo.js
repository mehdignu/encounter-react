import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './EventInfo.scss';
import Typography from "@material-ui/core/Typography";


const EventInfo = (props) => (

    <Paper className={cls.content} elevation={1}>


        <Typography variant="h5" className={cls.eventTitle}>
            some cool event
        </Typography>


    </Paper>

);

export default EventInfo;
