import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import freezeState from 'redux-freeze-state';

import './assets/styles/main.css';
import reducers from './store/reducers';
import App from './components/App';

const customMiddleWare = store => next => action => {
    next(action);

    if (/^\/canvas/.test(window.location.pathname)) {
        if (action.type !== 'UNDO' && action.type !== 'REDO') {
            next({ type: 'UPDATE_HISTORY' });
        };
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(freezeState(reducers), composeEnhancers(
    applyMiddleware(reduxThunk, customMiddleWare)
));

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.Fragment>
    </Provider>
    , document.getElementById('root'));