import { createStore, applyMiddleware,compose, combineReducers } from 'redux';
import api from '../middleware/api';
import thunk from 'redux-thunk';
import reducers from '../reducers/index'

const reducer = combineReducers(reducers);

const createStoreWithMiddleware =compose(
    applyMiddleware(thunk,api),
    window.devToolsExtension ? window.devToolsExtension() : f=> f
)
(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(reducer);
}
