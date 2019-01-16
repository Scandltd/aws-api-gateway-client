import {
    ACTION_SET_ACCOUNT_LIST,
    ACTION_SET_ACCOUNT_LOADED,
    ACTION_SET_LOADING_ACCOUNT_LIST
} from '../actions/types';

const defaultState = {
    accounts: [],
    loaded: false,
    loading: false,
};

const accountReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_LOADING_ACCOUNT_LIST:

            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case ACTION_SET_ACCOUNT_LIST:

            const accounts = action.payload.map((item, idx) => {
                return {...item, loaded: false};
            });

            return {
                ...state,
                accounts: accounts,
                loaded: true,
                loading:false,
            };

        case ACTION_SET_ACCOUNT_LOADED:
            const updatedItems = state.accounts.map(item => {
                if(item._id === action.payload.accountId){
                    return { ...item, loaded: true }
                }

                return item
            });

            return {
                ...state,
                accounts: updatedItems
            };

        default:
            return state;
    }
};

export default accountReducer;