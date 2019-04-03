import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Aux from "../CardMenu/CardMenu";
import {Helmet} from "react-helmet";
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

//this to make sure that the sharedialog component
//renders one time - i will refactor
//the code later cause i'm freaking lazy
let boo = false;

class ShareDialog extends React.Component {
    state = {
        open: false,
    };

    componentWillUnmount() {
        boo = false;
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.onHideShare();
    };


    render() {



        if(this.props.dialog === undefined){
            return null;
        }
            return (
                <div>

                    <Dialog
                        open={this.props.dialog.show}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Share your favorite Event</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Copy the Event Link below and share it with your friends !
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Event Link"
                                type="email"
                                value={"https://encounter.social/show/" + this.props.dialog.eventID}
                                fullWidth
                            />
                        </DialogContent>

                    </Dialog>
                </div>
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

        onHideShare: () => dispatch({type: actionTypes.HIDE_SHARE}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShareDialog));
