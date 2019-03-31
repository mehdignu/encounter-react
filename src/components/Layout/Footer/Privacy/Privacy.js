import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './Privacy.scss';
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


const Privacy = (props) => (

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
                        Privacy
                    </Typography>


                    <Typography className={cls.description}>

                        Please contact us with email : <a href="mailto:encounter.rocks@gmail.com"
                                                          target="_top">encounter.rocks@gmail.com</a>

                    </Typography>


                </Paper>

            </Grid>
            <Hidden smDown>

                <Grid item xs>

                    show profile new ads

                </Grid>
            </Hidden>
        </Grid>

        <Footer/>

    </Aux>


);

export default Privacy;
