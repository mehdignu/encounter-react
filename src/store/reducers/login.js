import * as actionTypes from '../actions';

const initialState = {
    hidden: true,
};

const login = (state = initialState, action) => {


    switch (action.type) {

        case actionTypes.SHOW:


            return {
                ...state,
                hidden: false
            };


        case actionTypes.HIDE:


            return {
                ...state,
                hidden: true
            };


        default:
    }

    return state;
};

export default login;
