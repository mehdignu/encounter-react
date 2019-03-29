import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import cls from './CardMenu.scss';
import Aux from '../../../hoc/Aux';
import ShareDialog from '../ShareDialog/ShareDialog';
import FacebookShare from "../Social/FacebookShare";

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
let share = false;

function CardMenu(props) {

    return (
        <Aux>

            <WithState>
                {({anchorEl, updateAnchorEl}) => {

                    const open = Boolean(anchorEl);

                    const handleClose = () => {
                        share = false;

                        updateAnchorEl(null);
                    };

                    const handleShare = () => {
                        share = true;
                        updateAnchorEl(null);

                    };


                    return (
                        <Aux>

                            {share ? (<Aux> <ShareDialog open={share} EventID={props.eventID}/> </Aux>) : null}


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
                                <MenuItem onClick={handleShare}>
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

export default CardMenu;
