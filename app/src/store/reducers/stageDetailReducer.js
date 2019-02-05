import { concat } from 'lodash';
import {
    ACTION_STAGE_DETAIL_LOADING_STAGE,
    ACTION_STAGE_DETAIL_SET_STAGE,
    ACTION_STAGE_DETAIL_SET_DEFAULT,
    ACTION_STAGE_DETAIL_LOADING_DEPLOYMENTS,
    ACTION_STAGE_DETAIL_DEPLOYMENTS_SET,
    ACTION_STAGE_DETAIL_DEPLOYMENTS_ADD,
} from '../actions/types';

const defaultState = {
    stage: null,
    stageLoading: false,
    deployments: [],
    deploymentPosition: null,
    deploymentsLoading: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const stageDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_STAGE_DETAIL_LOADING_STAGE:
            return {
                ...state,
                stageLoading: action.payload.loading,
            };

        case ACTION_STAGE_DETAIL_SET_STAGE:
            return {
                ...state,
                stage: action.payload.stage,
                stageLoading: false,
            };

        case ACTION_STAGE_DETAIL_LOADING_DEPLOYMENTS:
            return {
                ...state,
                deploymentsLoading: action.payload.loading,
            };

        case ACTION_STAGE_DETAIL_DEPLOYMENTS_SET:
            return {
                ...state,
                deploymentsLoading: action.payload.loading,
                deployments: action.payload.deployments,
                deploymentPosition: action.payload.position,
            };

        case ACTION_STAGE_DETAIL_DEPLOYMENTS_ADD:
            return {
                ...state,
                deploymentsLoading: action.payload.loading,
                deployments: concat(state.deployments, action.payload.deployments),
                deploymentPosition: action.payload.position,
            };

        case ACTION_STAGE_DETAIL_SET_DEFAULT:
            return defaultState;

        default:
            return state;
    }
};

export default stageDetailReducer;
