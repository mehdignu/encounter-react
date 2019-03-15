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

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function CardMenu() {
    return (
        <WithState>
            {({anchorEl, updateAnchorEl}) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };

                return (
                    <Aux>
                        <IconButton
                            aria-owns={open ? 'render-props-menu' : undefined}
                            aria-haspopup="true"
                            onClick={event => {
                                updateAnchorEl(event.currentTarget);
                            }}
                        >
                            <MoreVertIcon className={cls.butt}/>
                        </IconButton>
                        <Menu
                            disableAutoFocusItem={true}
                            id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <ShareIcon/>
                                Share
                            </MenuItem>

                            {/*<MenuItem onClick={handleClose}>Hide</MenuItem>*/}

                            {/*<MenuItem onClick={handleClose}>Report</MenuItem>*/}

                        </Menu>
                    </Aux>
                );
            }}
        </WithState>
    );
}

export default CardMenu;
