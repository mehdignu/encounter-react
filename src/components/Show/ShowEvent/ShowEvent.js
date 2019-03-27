import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './ShowEvent.scss';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';


const ShowEvent = (props) => (

    <Paper className={cls.content} elevation={1}>


        <CardMedia
            className={cls.eventMedia}
            image="https://www.lastminute.com/hotels/img/city/New-York-NY-US.jpg"
            title="Paella dish"
        />

        <Typography variant="h3" className={cls.title}>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi architecto aut blanditiis culpa dolor
            dolorum error est, facere iure molestias nobis optio, qui ratione tempore veritatis voluptatum. Atque,
            perferendis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi architecto aut blanditiis culpa dolor
            dolorum error est, facere iure molestias nobis optio, qui ratione tempore veritatis voluptatum. Atque,
            perferendis.
        </Typography>


        <Button variant="contained" color="primary" className={cls.joinButt}>
            Join the encounter
        </Button>

    </Paper>

);

export default ShowEvent;
