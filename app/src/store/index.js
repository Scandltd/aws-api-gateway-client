import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';      //@todo remove in prod
import thunk from 'redux-thunk';
import ApiCallMiddleware from '../middlewares/ApiCallMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, ApiCallMiddleware, logger)
));

export default store;