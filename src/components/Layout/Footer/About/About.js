import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './About.scss';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import AccessIcon from '@material-ui/icons/AccessTime';
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Footer from "../Footer";
import Aux from "../../../../hoc/Aux";
import {NavLink} from "react-router-dom";


const About = (props) => (

    <Aux>
        <Grid container spacing={40}>
            <Hidden smDown>

                <Grid item xs={1}>


                </Grid>
            </Hidden>
            <Grid item xs={12}>

                <Paper className={cls.content} elevation={1}>

                    <Typography className={cls.title}>
                        About
                    </Typography>


                    <Typography className={cls.description}>

                        <NavLink exact
                                 to={{pathname: '/'}} className={cls.link}>
                            Encounter
                        </NavLink>

                         is a place to create or join small spontaneous meetup groups.

                    </Typography>


                    <Typography className={cls.description}>

                        If you are in a new city or you want to find people to have meet up with, encounter is the right place for you !

                    </Typography>

                    <img alt="welcome page" className={cls.im} src="https://res.cloudinary.com/drtbzzsis/image/upload/q_auto:low/v1554633487/Encounter_-_1.jpg" />


                    <Typography className={cls.description}>


                        The events are protected by the admin and only the members of the event can chat with each other

                    </Typography>


                    <img alt="welcome page" className={cls.im} src="https://res.cloudinary.com/drtbzzsis/image/upload/q_auto:low/v1554634194/Encounter_and_Encounter_-_4.jpg" />



                    <Typography className={cls.description}>

                        Have a great experience on our new platform.

                    </Typography>

                </Paper>

            </Grid>
            <Hidden smDown>

                <Grid item xs={1}>

                    {/*show profile new ads*/}

                </Grid>
            </Hidden>
        </Grid>
        <Footer/>

    </Aux>

);

export default About;
