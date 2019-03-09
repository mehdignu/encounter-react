import React from 'react';
import Aux from '../../hoc/Aux';
import cls from './Event.scss';
import Paper from "@material-ui/core/Paper";

const event = (props) => (

    <Paper className={cls.content} elevation={1}>

        <div className={cls.wrapper}>



            <ul>

                <div className={cls.cont}>
                    <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" className={cls.right}/>
                    <li className={cls.me}>By this User, secondmessage</li>
                    <span className={cls["time-right"]}>11:02</span>
                </div>

                <div className={cls.cont}>
                    <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar"/>
                    <li className={cls.him}>By this User, first message</li>
                    <span className={cls["time-left"]}>11:05</span>
                </div>

            </ul>


            <input placeholder="Type a message" className={cls.sendTab}/>
        </div>
    </Paper>

);

export default event;
