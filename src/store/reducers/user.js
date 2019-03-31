import * as actionTypes from '../actions';

const initialState = {
    user: null,
    isLoggedIn: false,
    about: '',
    requests: [],
    infos: [],
    events: [],
    feed: [],

};

const user = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.STORE_USER:


            return {
                ...state,
                user: action.user,
                about: action.about
            };

        case actionTypes.USER_SIGNEDIN:

            return {
                ...state,
                isLoggedIn: true
            };


        case actionTypes.USER_SIGNEDOUT:

            return {
                ...state,
                isLoggedIn: false
            };


        case actionTypes.UPDATE_USER:

            return {
                ...state,
                about: action.about
            };


        case actionTypes.STORE_USER_EVENTS:

            return {
                ...state,
                events: action.events
            };

        case actionTypes.GET_REQUESTS:

            return {
                ...state,
                requests: [...state.requests, action.requester]
            };


        case actionTypes.RESET_REQUESTS:

            return {
                ...state,
                requests: []
            };


        case actionTypes.GET_FEED:

            return {
                ...state,
                feed: action.feed
            };


        case actionTypes.RESET_FEED:

            return {
                ...state,
                feed: []
            };

        case actionTypes.GET_NOTIFICATIONS:

            return {
                ...state,
                infos: [...state.infos, action.notification]
            };

        case actionTypes.RESET_NOTIFICATIONS:

            return {
                ...state,
                infos: []
            };


        case actionTypes.RESET:

            return {
                ...state,
                user: null,
                isLoggedIn: false,
                about: '',
                requests: [],
                infos: [],
                events: [],

            };

        default:
    }

    return state;
};

export default user;
