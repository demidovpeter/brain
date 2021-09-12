import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';

import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore() {
    /**
     * Create store with remote-devtools and logger middleware. Do it only
     * in development to reduce performance issues.
     */
    if (__DEV__) {
        const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

        return createStore(
            rootReducer,
            composeEnhancers(
                applyMiddleware(thunkMiddleware),
            ));

    } else {
        return createStore(
            rootReducer,
            composeWithDevTools(
                applyMiddleware(thunkMiddleware),
            ),
        );

    }
}
