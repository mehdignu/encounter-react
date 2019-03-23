import * as actionTypes from '../actions';

const initialState = {
    user: null,
    isLoggedIn: false

};

const user = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.STORE_USER:


            return {
                ...state,
               user: action.user
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

        case actionTypes.RESET:

            return {
                ...state,
                user: null
            };

        default:
    }

    return state;
};

export default user;
