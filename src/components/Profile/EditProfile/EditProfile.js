import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './EditProfile.scss';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Aux from "../../Feed/CardEvent/CardEvent";

const styles = theme => ({

    requestButt: {
        fontSize: 12,
        marginLeft: theme.spacing.unit,
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        padding: theme.spacing.unit,
        width: '90%',
        height: '200px',
    },
    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
});

class EditProfile extends React.Component {

    state = {

        description: '',


    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    render() {
        const {classes} = this.props;

        return (

            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Paper className={cls.content} elevation={1}>

                        <div className={cls.mainInfos}>

                            <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png"
                                    className={[classes.bigAvatar, cls.avtr]}/>


                            <Typography variant="h5" className={cls.eventDate}>
                                Mehdi Dridi

                            </Typography>

                        </div>

                        <TextField
                            id="standard-name"
                            label="About me"
                            className={classes.textField}
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />


                        <div className={cls.butts}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Save changes
                            </Button>


                            <Divider/>

                            <Button href="/" variant="outlined" color="secondary" className={classes.button}>
                                delete account
                            </Button>

                        </div>

                    </Paper>


                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        show profile new ads

                    </Grid>
                </Hidden>
            </Grid>

        );
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
