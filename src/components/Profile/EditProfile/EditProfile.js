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
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actions';
import axios from "axios";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import {withRouter} from "react-router-dom";
/* global gapi */

const styles = theme => ({

    requestButt: {
        fontSize: 12,
        marginLeft: theme.spacing.unit,
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
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

        description: this.props.currentUser.about,


    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    componentDidMount() {


    }


    onDelete = (e) => {

        var a = this;

        var auth2 = gapi.auth2.getAuthInstance();

        e.preventDefault();

        auth2.signOut().then(function () {
        });

        const uid = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;

        axios.delete('/api/deleteUser',
            {

                data: {userID: uid}

            ,
                headers: {
                    'Authorization': `Bearer ${JSON.stringify(token)}`
                }
            }
        )
            .then(function (response) {

                a.props.onDeleteUser();

                a.props.history.push('/')

            })
            .catch(function (error) {
                console.log(error);
            });


    };

    onUpdate = () => {


        if (this.state.description.length !== 0) {
            var a = this;
            const aboutUpdate = this.state.description;

            axios.post('/api/updateUser', {

                userID: this.props.currentUser.user.user.id,
                about: aboutUpdate

            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.stringify(this.props.currentUser.user.token)}`
                }
            })
                .then(function (response) {
                    a.props.onUpdateUser(aboutUpdate);
                })
                .catch(function (error) {
                    console.log(error);
                });


        }


    };


    render() {
        const {classes} = this.props;

        if (this.props.currentUser.user === null) {
            return null;
        }
        return (

            <Grid container spacing={24}>
                <Hidden smDown>

                    <Grid item xs>


                    </Grid>
                </Hidden>
                <Grid item xs>

                    <Paper className={cls.content} elevation={1}>

                        <div className={cls.mainInfos}>

                            <Avatar alt="Remy Sharp" src={this.props.currentUser.user.user.pic}
                                    className={classes.bigAvatar}/>


                            <Typography variant="h5" className={cls.eventDate}>
                                {this.props.currentUser.user.user.name}

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
                            <Button type="submit" variant="contained" color="primary" className={classes.button}
                                    onClick={this.onUpdate}>
                                Save changes
                            </Button>


                            <Divider/>

                            <Button href="/" variant="outlined" color="secondary" className={classes.button}
                                    onClick={this.onDelete}>
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

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {

        onUpdateUser: (about) => dispatch({type: actionTypes.UPDATE_USER, about: about}),
        onDeleteUser: () => dispatch({type: actionTypes.RESET}),

    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile)));
