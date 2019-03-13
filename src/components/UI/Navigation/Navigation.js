import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavMenu from './NavMenu/NavMenu';
import Aux from "../../../hoc/Aux";
import cls from './Navigation.scss';
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
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

    render() {

        const {anchorEl, anchorN, anchorR, mobileMoreAnchorEl} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMenuOpenN = Boolean(anchorN);
        const isMenuOpenR = Boolean(anchorR);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (

            <Aux>

                <Menu
                    disableAutoFocusItem={true}
                    className={cls.profileMenu}
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpen}
                    onClose={this.handleMenuClose}
                >

                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <Divider/>

                    <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>

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

                    <MenuItem onClick={this.handleMenuClose}>User2 has accepted your request to join some cool
                        event</MenuItem>
                    <Divider/>

                    <MenuItem onClick={this.handleMenuClose}>User3 has accepted your request to join another cool
                        event</MenuItem>


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

                        <Typography>User1 want to join some cool event</Typography>


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

                        <Typography>User2 want to join your cool event</Typography>
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
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );


        return (

            <div className={classes.root}>

                <AppBar position="fixed">


                    <Toolbar>

                        <NavMenu/>

                        <Typography className={classes.title} variant="h6" color="inherit" noWrap component="a"
                                    href="/">
                            Encounter
                        </Typography>

                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>


                        <div className={classes.grow}/>


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

                                <AccountCircle/>

                            </IconButton>

                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
