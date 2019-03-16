import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from "@material-ui/core/Paper";
import cls from './EventAttendees.scss'
import Typography from "@material-ui/core/Typography";



function EventAttendees(props) {
    return (

        <Paper className={cls.content} elevation={1}>


            <ul>

                <li className={cls.attenderInfo}>  <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png" />

                    <Typography paragraph>
                        Mehdi
                    </Typography>

                </li>

                <li className={cls.attenderInfo}>  <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar2.png" />

                    <Typography paragraph>
                        Hannah
                    </Typography>

                </li>
            </ul>



        </Paper>


    );
}


export default (EventAttendees);
