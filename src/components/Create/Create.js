import React from 'react';
import Aux from '../../hoc/Aux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from "@material-ui/core";
import CreateForm from "./CreateForm/CreateForm";
import {Route, Switch} from "react-router-dom";
import EditEvent from "./EditEvent/EditEvent";


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


                    <Switch>
                        <Route path="/eventForm/edit/:id" exact component={EditEvent}/>
                        <Route path="/eventForm/create" exact component={CreateForm}/>
                    </Switch>

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

