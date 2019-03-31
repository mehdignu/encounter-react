import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import cls from './EventAttendees.scss'
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";


function EventAttendees(props) {


    return (


        <li className={cls.attenderInfo}><Avatar alt={props.name} src={props.profileImg}/>

            <Typography paragraph>
                <NavLink exact
                         to={{pathname: '/user/' + props.userID}} className={cls.link}>
                    {props.name}
                </NavLink>
            </Typography>

        </li>

    );
}


export default (EventAttendees);
