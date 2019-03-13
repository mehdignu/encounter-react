import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './Requests.scss';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";

const styles = theme => ({

    requestButt: {
        fontSize: 12,
        marginLeft: theme.spacing.unit,
    }
});

const Requests = (props) => {

        const {classes} = props;
        return (

            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Paper className={cls.content} elevation={1}>


                        <div className={cls.notifs}>

                            <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png"
                                    className={cls.requestUsrImg}/>

                            <Typography>

                                User 2 want to join some cool event

                            </Typography>


                            <div className={cls.butts}>

                                <Button variant="contained" color="primary" size={"small"} className={classes.requestButt}>
                                    Add
                                </Button>

                                <Button variant="contained" color="secondary" size={"small"}
                                        className={classes.requestButt}>
                                    Delete
                                </Button>

                            </div>
                        </div>
                        <Divider/>

                    </Paper>


                </Grid>
                <Hidden smDown>

                    <Grid item xs>

                        create new ads

                    </Grid>
                </Hidden>
            </Grid>

        );
    };

Requests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);
