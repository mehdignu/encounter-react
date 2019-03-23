import * as actionTypes from '../actions';

const initialState = {
    num: 1,
};

const requests = (state = initialState, action) => {


    switch (action.type) {

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
