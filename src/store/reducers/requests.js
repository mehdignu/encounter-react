import * as actionTypes from '../actions';

const initialState = {
    num: 1,
    notifications: []
};

const requests = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.ADD_REQUEST:


            return {
                ...state,
                notifications: [...state.notifications, action.request]
            };

        case actionTypes.INCREMENT:


            return {
                ...state,
                num: state.num + 1
            };

        case actionTypes.RESET_REQUESTS:

            return {
                ...state,
                num: 0
            };

        default:
    }

    return state;
};

export default requests;
