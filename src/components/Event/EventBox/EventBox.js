import React, {Component} from 'react';
import cls from './EventBox.scss';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import {default as Chatkit} from '@pusher/chatkit-server';
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import EventMsg from "../EventMsg/EventMsg";

let chatManager = null;

class EventBox extends Component {


    state = {
        currentPusherUser: null,
        text: '',
        username: '',
        chats: [],
        messages: [],
        users: [],
        currentRoom: {users: []},

    };


    componentDidMount() {
        chatManager = new ChatManager({
            instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
            userId: this.props.currentUser.userID,
            tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
        });


        chatManager
            .connect()
            .then(currentUser => {

                this.setState({currentPusherUser: currentUser});

                return currentUser.subscribeToRoom({
                    roomId: this.props.pusherID,
                    messageLimit: 50,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                    }
                })
            })
            .then(currentRoom => {

            })
            .catch(error => console.log(error))


    }


    handleTextChange(e) {


        if (e.keyCode === 13) {


            this.state.currentPusherUser.sendMessage({
                text: e.target.value,
                roomId: this.props.pusherID
            });

            this.setState({
                text: ''
            })

        }
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    render() {

        if (this.props.currentUser === null) {
            return null;
        }


        return (

            <Paper className={cls.content} elevation={1}>

                <div className={cls.wrapper}>


                    <ul className={cls.chatbox}>

                        {this.state.messages.map((message, index) => {

                            const sender = this.props.participants.filter(x => x.userID === message.senderId)[0];

                            console.log(message.senderId);
                            if(sender){


                            return (
                                <EventMsg
                                    key={index}
                                    msgUser={sender.name}
                                    msgTime={message.createdAt}
                                    msgText={message.text}
                                    msgImg={sender.userImg}
                                />
                            );
                            }

                        })}


                    </ul>


                    <input placeholder="Type a message"
                           className={cls.sendTab}
                           value={this.state.text}
                           onSubmit={this.handleTextChange.bind(this)}
                           onKeyDown={this.handleTextChange.bind(this)}
                           onChange={this.handleChange.bind(this)}
                    />


                </div>


            </Paper>

        );
    }
}


//redux store values
const mapStateToProps = state => {
    return {
        currentUser: state.user,

    };
};


export default connect(mapStateToProps, null)(withRouter(EventBox));
