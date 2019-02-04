import {
    ACTION_STAGES_SET_LOADING,
    ACTION_STAGES_SET_STAGES,
    ACTION_STAGES_SET_DEFAULT,
    ACTION_STAGES_DELETE_REQUEST_LOADING,
    ACTION_STAGES_DELETE_STAGE,
} from '../actions/types';

const defaultState = {
    stages: [],
    loading: false,
    deleteRequestLoading: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const stagesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_STAGES_SET_LOADING:

            return {
                ...state,
                loading: action.payload.loading,
            };

        case ACTION_STAGES_SET_STAGES:
            return {
                ...state,
                stages: action.payload.stages,
                loading: false,
            };

        case ACTION_STAGES_DELETE_REQUEST_LOADING:
            return {
                ...state,
                deleteRequestLoading: action.payload.loading,
            };

        case ACTION_STAGES_DELETE_STAGE:
            return {
                ...state,
                deleteRequestLoading: false,
                stages: state.stages.filter((item) => {
                    return action.payload.stageName !== item.stageName;
                }),
            };

        case ACTION_STAGES_SET_DEFAULT:
            return defaultState;

        default:
            return state;
    }
};

export default stagesReducer;
