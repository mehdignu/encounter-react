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
            userId: '105466931476929488142',
            tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
        });



        chatManager
            .connect()
            .then(currentUser => {
                this.setState({currentPusherUser: currentUser})

                // return currentUser.subscribeToRoom({
                //     roomId: this.status.eventData.pusherID,
                //     messageLimit: 100,
                //     hooks: {
                //         onMessage: message => {
                //             this.setState({
                //                 messages: [...this.state.messages, message],
                //             })
                //         },
                //     }
                // })
            })
            .then(currentRoom => {

            })
            .catch(error => console.log(error))


    }

    // //delete the user from pusher
    // const chatManager = new ChatManager({
    //     instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
    //     userId: this.props.currentUser.userID,
    //     tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token'})
    // });


    //
    //
    // console.log(this.props.currentUser);
    //
    // chatManager.deleteUser({userId: this.props.currentUser.userID})
    //     .then(() => {
    //
    //         console.log('User deleted successfully');
    //
    //     }).catch((err) => {
    //     console.log(err);
    // });


    // //create a room
    // // user aka the creator of the room have to be auth in pusher first
    //
    // const chatManager = new ChatManager({
    //     instanceLocator: 'v1:us1:0bbd0f2e-db34-4853-b276-095eb3ef4762',
    //     userId: '12345',
    //     tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0bbd0f2e-db34-4853-b276-095eb3ef4762/token' })
    // });
    //
    // chatManager.connect()
    //     .then(currentUser => {
    //
    //         currentUser.createRoom({
    //             name: 'sex_room',
    //             private: true,
    //             addUserIds: [],
    //             customData: {},
    //         }).then(room => {
    //             console.log(`Created room called ${room.name}`)
    //         })
    //             .catch(err => {
    //                 console.log(`Error creating room ${err}`)
    //             })
    //
    //     })
    //     .catch(err => {
    //         console.log('Error on connection', err)
    //     })


    handleTextChange(e) {

        console.log(this.state);

        if (e.keyCode === 13) {


            this.state.currentPusherUser.sendMessage({
                text: e.target.value,
                roomId: this.props.pusherID
            })

        }
    }

    render() {

        if (this.props.currentUser === null ) {
            return null;
        }

        const {classes} = this.props;

        return (

            <Paper className={cls.content} elevation={1}>

                <div className={cls.wrapper}>


                    <ul className={cls.chatbox}>

                        <EventMsg/>
                        <EventMsg/>
                        <EventMsg/>


                    </ul>


                    <input placeholder="Type a message"
                           className={cls.sendTab}
                           onChange={this.handleTextChange.bind(this)}
                           onKeyDown={this.handleTextChange.bind(this)}/>


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

//dispatch actions that are going to be executed in the redux store
const mapDispatchToProps = dispatch => {
    return {

        onUpdateUser: (about) => dispatch({type: actionTypes.UPDATE_USER, about: about}),
        onDeleteUser: () => dispatch({type: actionTypes.RESET}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventBox));
