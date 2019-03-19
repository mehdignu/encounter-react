import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import cls from './EventAttendees.scss'
import Typography from "@material-ui/core/Typography";



function EventAttendees(props) {




    return (



                <li className={cls.attenderInfo}>  <Avatar alt={props.name} src={props.profileImg} />

                    <Typography paragraph>
                        {props.name}
                    </Typography>

                </li>

    );
}


export default (EventAttendees);
