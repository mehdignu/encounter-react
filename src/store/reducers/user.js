import * as actionTypes from '../actions';

const initialState = {
    isLoggedIn: true,
    name: '',
};

const user = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.STORE_USER:

            return {
                ...state,
                name: action.name
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

        default:
    }

    return state;
};

export default user;
