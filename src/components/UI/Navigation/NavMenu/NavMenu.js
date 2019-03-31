import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/Add';
import EventAvailable from '@material-ui/icons/Event';
import MenuIcon from '@material-ui/icons/Menu';
import Explicit from '@material-ui/icons/Explicit';
import {withStyles} from '@material-ui/core/styles';
import {NavLink, withRouter} from "react-router-dom";
import cls from './NavMenu.scss';
import axios from "axios";
import {connect} from "react-redux";
import moment from 'moment';


const drawerWidth = 240;
let channeLoaded = false;

const styles = theme => ({
    root: {
        display: 'flex',
    },


    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    menuButtonEvent: {
        marginRight: 20,

        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },


    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        top: '4rem',
        [theme.breakpoints.down('sm')]: {
            top: 0,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

let lock = false;

class NavMenu extends Component {
    state = {
        mobileOpen: false,
        open: true,
        events: [],
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
        if (this.state.mobileOpen === true)
            this.setState({mobileOpen: false});

    };


    handleOpenCreate = () => {
        this.props.history.push("/eventForm/create");
        if (this.state.mobileOpen === true)
            this.setState({mobileOpen: false});
    };

    componentWillReceiveProps(nextProps, prevState) {

        if (this.props.currentUser.user !== null) {

            this.onLoadMenuEvents();

        }
    }


    componentWillUnmount() {
        channeLoaded = false;

    }


    onLoadMenuEvents() {

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

                a.setState({loading: false});

                if (response.status === 200 && response.data.data) {

                    a.setState({events: response.data.data});
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    render() {
        const {classes, theme} = this.props;

        let key = 0;
        let userEvents = <p>loading events</p>;
        let userArchivedEvents = <p>loading archived events</p>;

        if (this.props.currentUser.user !== null && !channeLoaded) {
            this.onLoadMenuEvents();
            channeLoaded = true;
        }


        if (this.state.events.length !== 0) {

            userEvents = this.state.events


                .filter(x => moment({locale: "de"}).diff(x.date, 'hours') < 0)

                .map(
                    x => {

                        const eventID = x._id;

                        let eventTitle = '';
                        if (x.title.length > 20) {
                            eventTitle = x.title.substring(0, 15) + '...';
                        } else {
                            eventTitle = x.title;
                        }

                        return (

                            <NavLink className={cls.link} exact
                                     to={{pathname: '/event/' + eventID}} key={key++} onClick={this.handleClick}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Explicit/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={eventTitle}/>
                                </ListItem>
                            </NavLink>


                        );
                    }
                );

            userArchivedEvents = this.state.events


                .filter(x => moment({locale: "de"}).diff(x.date, 'hours') > 0)

                .map(
                    x => {

                        const eventID = x._id;

                        return (

                            <NavLink className={cls.link} exact
                                     to={{pathname: '/event/' + eventID}} key={key++} onClick={this.handleClick}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Explicit/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={x.title}/>
                                </ListItem>
                            </NavLink>


                        );
                    }
                );


        }
        const drawer = (
            <div>
                <Divider/>
                <List className={cls.lis}>

                    <ListItem button onClick={this.handleOpenCreate} key={'create'}>
                        <ListItemIcon><AddCircle/></ListItemIcon>
                        <ListItemText primary={'create '}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <EventAvailable/>
                        </ListItemIcon>
                        <ListItemText inset primary="Upcoming events" className={cls.listText}/>
                    </ListItem>

                    <List component="div">


                        {userEvents}

                    </List>


                </List>


                <Divider/>
                <List className={cls.lis}>


                    <ListItem button>
                        <ListItemIcon>
                            <EventAvailable/>
                        </ListItemIcon>
                        <ListItemText inset primary="Archived events" className={cls.listText}/>
                    </ListItem>

                    <List component="div">


                        {userArchivedEvents}

                    </List>


                </List>

            </div>
        );


        let menu = null;
        let menuButton = null;

        //case the chatbox page hide the side bar and show the menu button
        if (this.props.location.pathname.startsWith("/event/")) {

            menuButton = classes.menuButtonEvent;

            menu = (

                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {drawer}

                </Drawer>


            );


        } else {
            menuButton = classes.menuButton;

            menu = (

                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}

                </Drawer>
            );

        }

        return (
            <div className={classes.root}>

                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={menuButton}
                >

                    <MenuIcon/>

                </IconButton>


                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>


                    <Hidden xsDown implementation="css">
                        {menu}
                    </Hidden>
                </nav>


            </div>
        );
    }
}

NavMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
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


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(NavMenu)));
