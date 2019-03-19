import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import EventBox from "./EventBox/EventBox";
import EventInfo from "./EventInfo/EventInfo";
import EventAttendees from "./EventAttendees/EventAttendees";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});
const event = (props) => {


    const {classes} = props;
console.log(props);
    return (

        <div className={classes.root}>
            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs={2}>

                        <EventInfo/>


                    </Grid>
                </Hidden>
                <Grid item xs>


                    <EventBox />

                </Grid>
                <Hidden smDown>

                    <Grid item xs={2}>

                        <EventAttendees/>


                    </Grid>
                </Hidden>
            </Grid>
        </div>



    );
};

export default withStyles(styles)(event);

