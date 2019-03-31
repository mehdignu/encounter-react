import * as actionTypes from '../actions';

const initialState = {
    show: false,
    eventID: '',
};

const dialog = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.SHOW_SHARE:


            return {
                ...state,
                show: true,
                eventID: action.eventID
            };


        case actionTypes.HIDE_SHARE:


            return {
                ...state,
                show: false
            };


        default:
    }

    return state;
};

export default dialog;
