import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
});


class Create extends React.Component {
    state = {
        name: '',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;

        return (


            <Paper className={classes.root} elevation={1}>
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

            </Paper>

        );
    }
}

Create.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);
