import React from 'react';
import CardEvent from './CardEvent/CardEvent';
import Aux from '../../hoc/Aux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

});
const Feed = (props) => {


    const {classes} = props;

    return (

        <div className={classes.root}>
            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Aux>


                        <CardEvent/>
                        <CardEvent/>
                        <CardEvent/>
                    </Aux>
                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        main page ads

                    </Grid>
                </Hidden>
            </Grid>
        </div>



    );
};

export default withStyles(styles)(Feed);

