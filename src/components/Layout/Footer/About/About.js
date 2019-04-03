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


const About = (props) => (

    <Aux>
        <Grid container spacing={24}>
            <Hidden smDown>

                <Grid item xs>


                </Grid>
            </Hidden>
            <Grid item xs>

                <Paper className={cls.content} elevation={1}>


                    {/*<CardMedia*/}
                    {/*    className={cls.eventMedia}*/}
                    {/*    image="https://www.lastminute.com/hotels/img/city/New-York-NY-US.jpg"*/}
                    {/*    title="Paella dish"*/}
                    {/*/>*/}

                    <Typography variant="h4" className={cls.title}>
                        About
                    </Typography>


                    <Typography className={cls.description}>


                        Encounter is a place to create or join Events in your city created by other persons who share
                        the same interest.

                    </Typography>

                </Paper>

            </Grid>
            <Hidden smDown>

                <Grid item xs>

                    {/*show profile new ads*/}

                </Grid>
            </Hidden>
        </Grid>
        <Footer/>

    </Aux>

);

export default About;
