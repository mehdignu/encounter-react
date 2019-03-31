import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavMenu from './NavMenu/NavMenu';
import Aux from "../../../hoc/Aux";
import cls from './Navigation.scss';
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LoginBox from '../LoginBox/LoginBox';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
import {withRouter} from 'react-router-dom'
import axios from "axios";
/* global gapi */
const drawerWidth = 240;
let channeLoaded = false;

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        textDecoration: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    search: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        textDecoration: 'none',
        marginLeft: '2.5em',
        width: 'auto',
        float: 'left',
        textAlign: 'left',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            // marginLeft: theme.spacing.unit,
            // width: 'auto',
            marginRight: '1em',
            textAlign: 'center',

        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 190,
            '&:focus': {
                width: 250,
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    requestButt: {
        fontSize: 12,
        marginLeft: theme.spacing.unit,
    }
});

class Navigation extends Component {
    state = {
        anchorEl: null,
        anchorN: null,
        anchorR: null,
        mobileMoreAnchorEl: null,
        mobileMoreAnchorN: null,
        requests: [],
        requestsNum: 0,
        infos: [],
        infosNum: 0,
    };

    handleLogin = event => {


        if (!this.props.logBox.hidden) {
            this.props.onLogHide();

        } else {
            this.props.onLogShow();

        }

    };


    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleNotificationsMenuOpen = event => {
        // this.props.onRequestsCheck();
        this.setState({anchorN: event.currentTarget});
    };

    handleRequestsMenuOpen = event => {
        // this.props.onRequestsCheck();
        this.setState({anchorR: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.setState({anchorR: null});
        this.setState({anchorN: null});
        this.handleMobileMenuClose();
    };

    handleMenuCloseN = () => {

        this.setState({anchorN: null});
        this.clearInfos();

    };

    handleMenuCloseR = () => {
        this.setState({anchorR: null});
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget});
    };

    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null});
    };


    handleOpenProfile = () => {
        this.props.history.push('/edit_profile');
        this.handleMenuClose();
    };


    handleHomeButton = () => {
        if (!this.props.locker.locked) {
            this.props.history.push('/');
            this.handleMenuClose();
        }

    };

    handleLogout = () => {
        var auth2 = gapi.auth2.getAuthInstance();

        channeLoaded = false;

        var a = this;

        auth2.signOut().then(function () {
            a.props.onLogOut();
            a.props.onLogOutReset();
            a.handleMenuClose();
            a.props.history.push('/');

        });
    };


    clearInfos() {

        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;

        axios.post('/api/clearInfos', {

            userID: userId

        }, {
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        }).then(
            a.props.onResetNotifications()
        )


            .catch(function (error) {
                console.log(error);
            });
    }


    deleteRequest(admin, userID, eventID) {

        if (this.props.currentUser.user !== null) {


            const token = this.props.currentUser.user.token;

            var a = this;
            //add the room to mongo
            axios.post('/api/deleteRequest', {

                    admin: admin,
                    userID: userID,
                    eventID: eventID,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.stringify(token)}`
                    }
                })
                .then(function (response) {

                    a.userRequests();


                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };


    allowUser(userID, eventID) {

        if (this.props.currentUser.user !== null) {


            const token = this.props.currentUser.user.token;

            var a = this;
            //add the room to mongo
            axios.post('/api/allowUserRequest', {

                    userID: userID,
                    eventID: eventID,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.stringify(token)}`
                    }
                })
                .then(function (response) {

                    a.userRequests();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    userNotifications() {

        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;


        axios.get('/api/getUserInfos', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {


                if (response.status === 200 && response.data.data) {
                    a.props.onResetNotifications();


                    response.data.data.map(
                        x => {

                            if (x.infos.length > 0) {

                                //get user notifications
                                a.props.onFetchUserNotifications(x.infos);

                            }

                        }
                    );

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    userRequests() {


        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;


        axios.get('/api/getUserEvents', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {

                if (response.status === 200 && response.data.data) {

                    a.props.onResetRequests();


                    response.data.data.map(
                        x => {

                            if (x.requester.length > 0) {

                                //get user requests

                                a.props.onFetchUserRequests(x.requester);
                            }

                        }
                    );

                }

            })
            .catch(function (error) {
                console.log(error);
            });


    }
    onLoadFeed() {
        //get all th events to be displayed on the feed

        var a = this;
        axios.get('/api/getFeed')
            .then(function (response) {

                if (response.status === 200) {


                    a.props.resetFeed();
                    a.props.getFeed(response.data.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    menuEvents() {

        var a = this;
        const userId = this.props.currentUser.user.user.id;
        const token = this.props.currentUser.user.token;

        axios.get('/api/getUserEvents', {
            params: {
                userID: userId
            },
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }

        })
            .then(function (response) {


                if (response.status === 200 && response.data.data) {

                    a.props.onSaveUserEvents(response.data.data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        const {anchorEl, anchorN, anchorR, mobileMoreAnchorEl} = this.state;
        const {classes, ...other} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMenuOpenN = Boolean(anchorN);
        const isMenuOpenR = Boolean(anchorR);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


        let mainMenu = null;
        let sideMenu = null;
        let moreMenu = null;

        let notifications = (
            <MenuItem onClick={this.handleMenuClose} className={cls.menuItem}>


                <Typography>

                    no requests yet

                </Typography>


            </MenuItem>

        );


        let infos = (
            <MenuItem onClick={this.handleMenuClose}>


                <Typography>


                    no notifications to show

                </Typography>

            </MenuItem>

        );

        if (!this.props.currentUser.isLoggedIn) {


            mainMenu = (

                <div className={classes.sectionDesktop}>


                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleLogin}
                        color="inherit"
                    >

                        <AccountCircle/>

                    </IconButton>


                </div>
            );


            moreMenu = (

                <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleLogin}
                    color="inherit"
                >

                    <AccountCircle/>

                </IconButton>

            );


        } else {

            if (this.props.currentUser.user !== null && !channeLoaded) {
                this.menuEvents();
                this.userRequests();
                this.userNotifications();
                this.onLoadFeed();

                channeLoaded = true;
            }

            if (this.props.currentUser.requests.length !== 0) {


                let key = 0;
                notifications = this.props.currentUser.requests.map(
                    s =>

                        s.map((x, i) => {

                            return (
                                <Aux key={key++}>

                                    <MenuItem onClick={this.handleMenuClose} className={cls.menuItem}>
                                        <Avatar alt="Remy Sharp" src={x.userPic}
                                                className={cls.requestUsrImg}/>

                                        <Typography>

                                            {x.userName} want to join {x.eventName}

                                        </Typography>


                                        <div className={cls.butts}>

                                            <Button variant="contained" color="primary" size={"small"}
                                                    onClick={() => this.allowUser(x.userID, x.eventID)}
                                                    className={classes.requestButt}>
                                                Add
                                            </Button>

                                            <Button variant="contained" color="secondary" size={"small"}
                                                    onClick={() => this.deleteRequest(x.admin, x.userID, x.eventID)}
                                                    className={classes.requestButt}>
                                                Delete
                                            </Button>

                                        </div>

                                    </MenuItem>

                                    <Divider/>
                                </Aux>
                            );
                        })
                );
            }


            if (this.props.currentUser.infos.length !== 0) {


                let key = 0;
                infos = this.props.currentUser.infos.map(
                    s =>

                        s.map((x, i) => {

                            return (
                                <Aux key={key++}>

                                    <MenuItem onClick={this.handleMenuClose}>

                                        <Avatar alt="Remy Sharp" src={x.adminPic}
                                                className={cls.requestUsrImg}/>

                                        <Typography>

                                            {x.adminName} has accepted your request to join {x.eventTitle}

                                        </Typography>

                                    </MenuItem>

                                    <Divider/>
                                </Aux>
                            );
                        })
                );
            }

            sideMenu = (
                <NavMenu {...other} />

            );

            mainMenu = (

                <div className={classes.sectionDesktop}>


                    <IconButton
                        aria-owns={isMenuOpenR ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleRequestsMenuOpen}
                        color="inherit"
                    >
                        <Badge badgeContent={this.props.currentUser.requests.length} color="secondary">
                            <PersonAddIcon/>
                        </Badge>
                    </IconButton>


                    <IconButton
                        aria-owns={isMenuOpenN ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleNotificationsMenuOpen}
                        color="inherit"
                    >
                        <Badge badgeContent={this.props.currentUser.infos.length} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>


                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                    >

                        <KeyboardArrowDownIcon/>

                    </IconButton>


                </div>

            );

            moreMenu = (
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                    <MoreIcon/>
                </IconButton>


            );

        }

        const renderMenu = (

            <Aux>


                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpen}
                    onClose={this.handleMenuClose}
                >

                    <MenuItem onClick={this.handleOpenProfile}>My Profile</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>


                <Menu
                    disableAutoFocusItem={true}
                    className={cls.menu}
                    anchorEl={anchorN}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpenN}
                    onClose={this.handleMenuCloseN}
                >

                    {infos}


                </Menu>


                <Menu
                    disableAutoFocusItem={true}
                    className={cls.menu}
                    anchorEl={anchorR}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpenR}
                    onClose={this.handleMenuCloseR}
                >

                    {notifications}

                </Menu>

            </Aux>
        );

        const renderMobileMenu = (
            <Menu
                disableAutoFocusItem={true}
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >

                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <PersonAddIcon/>
                        </Badge>
                    </IconButton>
                    <p>Requests</p>
                </MenuItem>

                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>

                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle/>
                    </IconButton>
                    Profile
                </MenuItem>
            </Menu>
        );


        return (

            <Aux>

                <LoginBox/>

                <div className={classes.root}>


                    <AppBar position="fixed">


                        <Toolbar>

                            {sideMenu}

                            <div className={classes.grow}/>

                            <Typography className={classes.search} variant="h6" color="inherit" noWrap
                                        component="a"
                                        onClick={this.handleHomeButton}>
                                Encounter
                            </Typography>

                            <div className={classes.grow}/>


                            {mainMenu}

                            <div className={classes.sectionMobile}>
                                {moreMenu}
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                </div>
            </Aux>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};


//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequests: state.requests,
        locker: state.locker,
        logBox: state.login,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),
        onLogOutReset: () => dispatch({type: actionTypes.RESET}),
        onLogShow: () => dispatch({type: actionTypes.SHOW}),
        onLogHide: () => dispatch({type: actionTypes.HIDE}),
        onSaveUserEvents: (events) => dispatch({type: actionTypes.STORE_USER_EVENTS, events: events}),
        onFetchUserRequests: (requester) => dispatch({type: actionTypes.GET_REQUESTS, requester: requester}),
        onResetRequests: () => dispatch({type: actionTypes.RESET_REQUESTS}),
        onResetNotifications: () => dispatch({type: actionTypes.RESET_NOTIFICATIONS}),
        onFetchUserNotifications: (notification) => dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            notification: notification
        }),
        getFeed: (feed) => dispatch({type: actionTypes.GET_FEED, feed: feed}),
        resetFeed: () => dispatch({type: actionTypes.RESET_FEED}),

    }
};


export default withStyles(styles)(connect(mapStateToProps,
    mapDispatchToProps)(withRouter(Navigation)));
