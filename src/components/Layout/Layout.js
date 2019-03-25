import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Navigation from '../UI/Navigation/Navigation';
import classes from './Layout.scss';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Snackbar from '../UI/Navigation/Snackbar/SnackbarUI';

let channeLoaded = false;
let channel = null;

class Layout extends Component {


    state = {
        notifications: [],
    };



    render() {


        if (window.pusher !== undefined && !channeLoaded && this.props.currentUser.user !== null) {
            var a = this;

            channel = window.pusher.subscribe('general-channel');

            channel.bind(this.props.currentUser.user.user.id, function (data) {

                a.setState(prevState => ({
                    notifications: [...prevState.notifications, data]
                }))

            });

            channeLoaded = true;

        }


        let not = null;

        let key2 = 0;

        if (this.state.notifications) {


            not = this.state.notifications.map(function (x) {

                return <Snackbar msg={x.message} key={key2++}/>
            });
        }


        return (
            <Aux>
                {not}


                <Navigation {...this.props} />


                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user
    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {}
};


export default (connect(mapStateToProps, mapDispatchToProps)(Layout));

