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

//this to make sure that the sharedialog component
//renders one time - i will refactor
//the code later cause i'm freaking lazy
let boo = false;

class ShareDialog extends React.Component {
    state = {
        open: this.props.open,
    };

    componentWillUnmount() {
        boo = false;
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render() {
        const {fullScreen} = this.props;


        if (!boo) {

            boo = true;

            return (
                <div>

                    <Dialog
                        // fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >

                        <DialogTitle id="responsive-dialog-title">{"Share your Favorite Event"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                encounter.social/event/{this.props.EventID}
                            </DialogContentText>


                        </DialogContent>


                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        } else {
            return null;
        }
    }
}


ShareDialog
    .propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()

(
    ShareDialog
)
;
