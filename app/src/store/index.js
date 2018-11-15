import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';      //@todo remove in prod
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;