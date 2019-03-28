import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import cls from './EventMsg.scss';

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

    },
    grid: {
        width: '60%',
        margin: 'auto',
    },
});


class EventMsg extends Component {


    render() {

        return (

            <div className={cls.cont}>
                <img src={this.props.msgImg} alt="Avatar"
                     className={cls.right}/>


                <div className={cls.userInfo}>

                    <span className={cls.name}>{this.props.msgUser}</span>
                    <span className={cls["time"]}>{this.props.msgTime}</span>
                </div>

                <li className={cls.msg}>{this.props.msgText}
                </li>
            </div>

        );
    }
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,

    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        // onLogOut: () => dispatch({type: actionTypes.USER_SIGNEDOUT, loggedin: false}),


    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(EventMsg)));


