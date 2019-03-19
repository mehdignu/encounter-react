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
            Event Title
        </Typography>


        <div className={cls.mainInfo}>

            <div className={cls.placeInfo}>

                <IconButton aria-label="Event place" disabled={true} className={cls.straightButt}>


                    <PlaceIcon/>


                </IconButton>
                <Typography paragraph>
                    Aristotelessteig 6, 10318 Berlin
                </Typography>

            </div>

            <div className={cls.timeInfo}>


                <IconButton aria-label="Event time" disabled={true}>
                    <AccessIcon/>

                </IconButton>

                <Typography paragraph>
                    13th February 2019 10:00 AM
                </Typography>
            </div>
        </div>


        <Typography className={cls.description}>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, maiores voluptates. Animi aut beatae
            dignissimos dolor in, incidunt itaque natus nemo nobis quisquam repellat sapiente sequi soluta, tempore,
            vero? Incidunt!

        </Typography>


    </Paper>

);

export default EventInfo;
