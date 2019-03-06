import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

class Create extends React.Component {
    state = {
        name: '',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="standard-name"
                    label="Encounter title"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />


                <TextField
                    id="standard-name"
                    label="Description"
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />

                <TextField
                    id="standard-name"
                    label="Location"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange('location')}
                    margin="normal"
                />

            </form>
        );
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);
