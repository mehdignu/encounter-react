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
import { withRouter } from 'react-router-dom'
/* global gapi */
const drawerWidth = 240;


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
        loginHidden: true
    };

    handleLogin = event => {

        this.setState({loginHidden: !this.state.loginHidden})


    };


    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleNotificationsMenuOpen = event => {
        this.setState({anchorN: event.currentTarget});
    };

    handleRequestsMenuOpen = event => {
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
        this.props.history.push('/');
        this.handleMenuClose();
    };

    handleLogout = () => {
        var auth2 = gapi.auth2.getAuthInstance();


        var a = this;

        auth2.signOut().then(function () {
            a.props.onLogOut();
            a.props.onLogOutReset();
            a.handleMenuClose();
        });
    };

    render() {


        const {anchorEl, anchorN, anchorR, mobileMoreAnchorEl} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMenuOpenN = Boolean(anchorN);
        const isMenuOpenR = Boolean(anchorR);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


        let mainMenu = null;
        let sideMenu = null;
        let moreMenu = null;


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


            sideMenu = (
                <NavMenu/>


            );

            mainMenu = (

                <div className={classes.sectionDesktop}>


                    <IconButton
                        aria-owns={isMenuOpenR ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleRequestsMenuOpen}
                        color="inherit"
                    >
                        <Badge badgeContent={5} color="secondary">
                            <PersonAddIcon/>
                        </Badge>
                    </IconButton>


                    <IconButton
                        aria-owns={isMenuOpenN ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleNotificationsMenuOpen}
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="secondary">
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

                    <MenuItem onClick={this.handleMenuClose}>


                        User 1 has accepted your request to join some cool some cool event
                    </MenuItem>
                    <Divider/>

                    <MenuItem onClick={this.handleMenuClose}>User 3 has
                        accepted your request to join some cool event</MenuItem>


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

                    <MenuItem onClick={this.handleMenuClose} className={cls.menuItem}>
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

                    </MenuItem>
                    <Divider/>

                    <MenuItem onClick={this.handleMenuClose}>

                        <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar2.png"
                                className={cls.requestUsrImg}/>

                        <Typography>

                            User1 want to join some cool event boohoo madafaka

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
                    </MenuItem>

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
                        <Badge badgeContent={5} color="secondary">
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

                <LoginBox hidden={this.state.loginHidden}/>

                <div className={classes.root}>


                    <AppBar position="fixed">


                        <Toolbar>

                            {sideMenu}

                            <div className={classes.grow}/>

                            <Typography className={classes.search} variant="h6" color="inherit" noWrap component="a"
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

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),
        onLogOutReset: () => dispatch({type: actionTypes.RESET}),



    }
};


export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation)));
