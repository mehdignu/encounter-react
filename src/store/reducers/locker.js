import * as actionTypes from '../actions';

const initialState = {
    locked: false,
};

const locker = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.LOCK:


            return {
                ...state,
                locked: true
            };


        case actionTypes.UNLOCK:


            return {
                ...state,
                locked: false
            };


        default:
    }

    return state;
};

export default locker;
