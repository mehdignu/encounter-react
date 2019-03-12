import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
    grid: {
        width: '60%',
        margin: 'auto',
    },
};

class DatePickerUI extends Component {
    state = {
        // The first commit of Material-UI
        selectedDate: new Date('2014-08-18T21:11:54'),
    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state;

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container className={classes.grid} justify="space-around">
                    <DatePicker
                        margin="normal"
                        label="Date"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                    />
                    <TimePicker
                        margin="normal"
                        label="Time"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

DatePickerUI.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickerUI);
