import * as actionTypes from '../actions';

const initialState = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    profileImage: '',
    about: '',
};

const user = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.STORE_USER:


            return {
                ...state,
                userID: action.user.userId,
                name: action.user.name,
                email: action.user.email,
                profileImage: action.user.image,
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
                isLoggedIn: false,
                userID: null,
                name: '',
                email: '',
                profileImage: '',
                about: '',
            };

        default:
    }

    return state;
};

export default user;
