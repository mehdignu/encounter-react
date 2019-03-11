import React from 'react';
import Aux from '../../hoc/Aux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import CreateForm from "./CreateForm/CreateForm";

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
                        <CreateForm/>
                    </Aux>
                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        create new ads

                    </Grid>
                </Hidden>
            </Grid>
        </div>



    );
};

export default withStyles(styles)(Feed);

