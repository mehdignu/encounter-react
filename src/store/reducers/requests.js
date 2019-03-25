import * as actionTypes from '../actions';

const initialState = {
    incomingRequest: false,
    notifications: []
};

const requests = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.ADD_REQUEST:


            return {
                ...state,
                incomingRequest: true
            };


        case actionTypes.END_REQUEST:


            return {
                ...state,
                incomingRequest: false
            };


        default:
    }

    return state;
};

export default requests;
