import React from 'react';
import Aux from '../../hoc/Aux';
import cls from './Event.scss';
import Paper from "@material-ui/core/Paper";

const event = (props) => (

        <Paper className={cls.content} elevation={1}>

            <div className={cls.wrapper}>


                <ul>

                    <div className={cls.cont}>
                            <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar"
                                 className={cls.right}/>


                        <div className={cls.userInfo}>

                        <span className={cls.name}>user1</span>
                            <span className={cls["time-right"]}>11:02</span>
                        </div>

                        <li className={cls.msg}>By this User, secondmessage Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid amet aperiam ipsa laboriosam laudantium quae quas sequi totam, vitae! Ad at cum dolorum, ducimus eos provident quia quod temporibus.</li>
                    </div>

                    <div className={cls.cont}>
                            <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar"
                                 className={cls.right}/>


                        <div className={cls.userInfo}>

                        <span className={cls.name}>user1</span>
                            <span className={cls["time-right"]}>11:02</span>
                        </div>

                        <li className={cls.msg}>By this User, secondmessage</li>
                    </div>


                </ul>


                <input placeholder="Type a message" className={cls.sendTab}/>
            </div>

        </Paper>

    )
;

export default event;
