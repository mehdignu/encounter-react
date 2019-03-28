import React, {Component} from 'react';
import cls from './EventBox.scss';
import Paper from "@material-ui/core/Paper";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import EventMsg from "../EventMsg/EventMsg";
import {ClipLoader} from 'react-spinners';
import {css} from '@emotion/core';

let chatManager = null;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin: auto;
    padding: auto;
`;

const spinne = css`
    margin: auto;
    padding: auto;
`;

class EventBox extends Component {


    state = {
        currentPusherUser: null,
        text: '',
        username: '',
        chats: [],
        messages: [],
        users: [],
        currentRoom: {users: []},
        loading: true

    };


    componentDidMount() {
        chatManager = new ChatManager({
            instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
            userId: this.props.currentUser.user.user.id,
            tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
        });

        chatManager
            .connect()
            .then(currentUser => {

                this.setState({currentPusherUser: currentUser});

                return currentUser.subscribeToRoom({
                    roomId: this.props.pusherID,
                    messageLimit: 20,
                    hooks: {

                        onMessage: message => {

                            this.setState({
                                messages: [...this.state.messages, message],
                            })

                        },
                    }
                })
            }).then(() => {
                if (this.state.messages.length === 0)
                    this.setState({loading: false});

            }
        )

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
        let chat = (
            <div className='sweet-loading'>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        );

        if (this.props.currentUser === null) {
            return null;
        }


        chat = this.state.messages
            .map((message, index) => {

                const sender = this.props.participants.filter(x => x.userID === message.senderId)[0];

                if (sender) {

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

            });


        return (

            <Paper className={cls.content} elevation={1}>

                <div className={cls.wrapper}>


                    <ul className={cls.chatbox}>

                        {chat.length > 0 ? chat :

                            <div className={cls.spinne}>
                                <div className='sweet-loading'>
                                    <ClipLoader
                                        css={override}
                                        sizeUnit={"px"}
                                        size={50}
                                        color={'#123abc'}
                                        loading={this.state.loading}
                                    />
                                </div>
                            </div>

                        }


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
