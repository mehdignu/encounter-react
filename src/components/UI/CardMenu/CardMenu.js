import React, {useState, useRef, useEffect, Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import cls from './CardMenu.scss';
import Aux from '../../../hoc/Aux';
import FacebookShare from "../Social/FacebookShare";
import * as actionTypes from "../../../store/actions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
let share = false;
let EventID = null;

class CardMenu extends Component {





    render(){
        if(this.props.dialog === null){
            return null;
        }

    return (
        <Aux>

            <WithState>
                {({anchorEl, updateAnchorEl}) => {

                    const open = Boolean(anchorEl);


                   const handleClickOpen = () => {
                        this.setState({ open: true });
                    };

                    const handleClosed = () => {
                        this.setState({ open: false });
                    };



                    const handleClose = () => {
                        share = false;
                        updateAnchorEl(null);
                    };

                    const handleShare = () => {

                        EventID = this.props.eventID;
                        share = true;
                        updateAnchorEl(null);
                        share = true;
                        this.props.onShare(EventID);

                    };

                    return (
                        <Aux>

                            <IconButton
                                aria-owns={open ? 'render-props-menu' : undefined}
                                aria-haspopup="true"
                                onClick={event => {
                                    updateAnchorEl(event.currentTarget);
                                    share = false;
                                }}
                            >
                                <MoreVertIcon className={cls.butt}/>
                            </IconButton>
                            <Menu
                                disableAutoFocusItem={true}
                                id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={ handleShare}>
                                    <ShareIcon/>
                                    Share
                                </MenuItem>

                            </Menu>
                        </Aux>
                    );
                }}
            </WithState>
        </Aux>
    );
}
}

//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,
        currentRequests: state.requests,
        logBox: state.login,
        dialog: state.dialog


    };
};

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {

        onShare: (eventID) => dispatch({type: actionTypes.SHOW_SHARE, eventID: eventID}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardMenu));

