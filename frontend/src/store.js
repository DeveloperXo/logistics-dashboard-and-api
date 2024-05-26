import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import { userReducer } from './reducers/user.reducer';
import { customerReducer } from './reducers/manageUser.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    sidebarShow: true,
    theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    changeState: changeState,
    mangeCustomers: customerReducer
});



const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store
