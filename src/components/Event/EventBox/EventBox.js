import React, {Component} from 'react';
import cls from './EventBox.scss';
import Paper from "@material-ui/core/Paper";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import EventMsg from "../EventMsg/EventMsg";
import {ClipLoader} from 'react-spinners';
import {css} from '@emotion/core';
import * as actionTypes from '../../../store/actions';
import Aux from "../../../hoc/Aux";
import * as params from '../../../client_params';

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

    _isMounted = false;

    state = {
        currentPusherUser: null,
        text: '',
        username: '',
        chats: [],
        messages: [],
        users: [],
        currentRoom: {users: []},
        loading: true,
        inputDisable: true

    };


    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true;

        this.onLoad();
    }

    onLoad = () => {
        // this.props.onLock();
        chatManager = new ChatManager({
            instanceLocator: params.instanceLocator,
            userId: this.props.currentUser.user.user.id,
            tokenProvider: new TokenProvider({url: params.tokenProvider})
        });

        chatManager
            .connect()
            .then(currentUser => {
                if (this._isMounted) {

                    this.setState({currentPusherUser: currentUser});

                    return currentUser.subscribeToRoom({
                            roomId: this.props.pusherID,
                            messageLimit: 100,
                            hooks: {
                                onMessage: message => {
                                    this.setState({
                                        messages: [...this.state.messages, message],
                                    })

                                },
                            }
                        }
                    )
                }
            })
            .then(() => {
                    if (this.state.messages.length === 0)
                        this.setState({loading: false});
                    this.setState({inputDisable: false});
                    // this.props.onUnLock();
                }
            )

            .catch(error => {
                // this.props.onUnLock();
                console.log(error);
            })

    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
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
        let chat = '';

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

        if (this.messagesEnd) {
            this.scrollToBottom();

        }

        return (

            <Paper className={cls.content} elevation={1}>

                <div className={cls.wrapper}>


                    <ul className={cls.chatbox}>

                        {chat.length > 0 ?
                            <Aux>
                                {chat}


                            </Aux>
                            :

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

                        <div style={{float: "left", clear: "both"}}
                             ref={(el) => {
                                 this.messagesEnd = el;
                             }}>
                        </div>
                    </ul>


                    <input placeholder="Type a message"
                           className={cls.sendTab}
                           value={this.state.text}
                           onSubmit={this.handleTextChange.bind(this)}
                           onKeyDown={this.handleTextChange.bind(this)}
                           onChange={this.handleChange.bind(this)}
                           // disabled={this.state.inputDisable}
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
        lock: state.locker,

    };
};


//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {
        // onLock: () => dispatch({type: actionTypes.LOCK}),
        // onUnLock: () => dispatch({type: actionTypes.UNLOCK}),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventBox));
