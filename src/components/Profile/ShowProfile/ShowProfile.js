import React from 'react';
import Paper from "@material-ui/core/Paper";
import cls from './ShowProfile.scss';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";
import axios from "axios";
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

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
        textAlign: 'center',
        paddingTop: '10px'
    },
    button: {
        margin: theme.spacing.unit,
        width: '100%'
    },
});
let lock = false;

class ShowProfile extends React.Component {

    state = {

        userToShow: null

    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    onLoadUser() {

        var a = this;
        const token = this.props.currentUser.user.token;

        //get the participant
        axios.get('/api/getUserEvent', {
            params: {
                userID: a.props.match.params.id
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        })
            .then(function (response) {


                    const userParticipant = {

                        name: response.data.data.name,
                        userID: response.data.data.userId,
                        userImg: response.data.data.image,
                        userAbout: response.data.data.about,
                    };

                    a.setState({
                        userToShow: userParticipant
                    })
                }
            ).catch(function (error) {
            console.log(error);
        });

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.match.params.id !== nextProps.match.params.id) {

            this.onLoadUser();

        }
    }

    componentDidMount() {
        if (this.props.currentUser.user !== null) {
            this.onLoadUser();
        }
    }


    render() {
        const {classes} = this.props;

        if (this.props.match.params.id !== null && this.props.currentUser.user !== null && !lock) {

            this.onLoadUser();
            lock = true;
        }

        if (this.state.userToShow === null || this.props.match.params.id === null) {
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

                            <Avatar alt="Remy Sharp" src={this.state.userToShow.userImg}
                                    className={classes.bigAvatar}/>


                            <Typography variant="h4" className={cls.eventDate}>
                                {this.state.userToShow.name}

                            </Typography>

                        </div>

                        <Typography variant="h5" className={classes.textField}>
                            {this.state.userToShow.userAbout}

                        </Typography>


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

ShowProfile.propTypes = {
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
    return {}
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowProfile)));

