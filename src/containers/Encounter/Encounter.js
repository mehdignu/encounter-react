import React from 'react';
import Feed from '../../components/Feed/Feed';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function Encounter(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>



                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Feed/>

                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        something cool

                    </Grid>
                </Hidden>
            </Grid>
        </div>
    );
}

Encounter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Encounter);
