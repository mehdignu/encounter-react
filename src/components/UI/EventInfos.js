import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({

});

function EventInfos(props) {
    const { classes } = props;
    return (
        <div>

            <Tooltip title="Add" aria-label="Add">
                <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>

        </div>
    );
}

EventInfos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventInfos);
