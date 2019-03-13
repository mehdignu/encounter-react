import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import ShowEvent from "./ShowEvent/ShowEvent";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});
const Show = (props) => {


    const {classes} = props;

    return (

        <div className={classes.root}>
            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs={2}>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <ShowEvent/>

                </Grid>
                <Hidden smDown>

                    <Grid item xs={2}>

                        show new ads

                    </Grid>
                </Hidden>
            </Grid>
        </div>



    );
};

export default withStyles(styles)(Show);

