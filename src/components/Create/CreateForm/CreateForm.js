import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';
import DatePickerUI from "../../UI/DatePickerUI/DatePickerUI";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        padding: theme.spacing.unit,
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
        justifyContent: 'center',
    },

    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
    input: {
        display: 'none',
    },
    headerNew: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'

    }
});



const tags = [
    {
        value: 'Social',
        label: 'social',
    },
    {
        value: 'Sport',
        label: 'Sport',
    },
    {
        value: 'Hobby',
        label: 'Hobby',
    },
];

class CreateForm extends React.Component {
    state = {
        title: '',
        description: '',
        introduction: '',
        maxim: '',
        tag: '',
        selectedDate: '2019-05-24T10:30',

    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    render() {
        const {classes} = this.props;

        return (


            <Paper className={classes.root} elevation={1}>


                <form className={classes.container} noValidate autoComplete="off">

                    <Typography variant="h4">
                        Create new Encounter
                    </Typography>

                    <TextField
                        id="standard-name"
                        label="Encounter title"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        required={true}
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
                        required
                    />

                    <DatePickerUI />


                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Create
                    </Button>

                    <Button href="/" variant="outlined" color="primary" className={classes.button}>
                        Back
                    </Button>

                </form>

            </Paper>

        );
    }
}

CreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateForm);
