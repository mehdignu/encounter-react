import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/sass/main.scss';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers} from 'redux'
import userReducer from './store/reducers/user'
import requestsReducer from './store/reducers/requests'
import lockerReducer from './store/reducers/locker'
import loginReducer from './store/reducers/login'
import dialogReducer from './store/reducers/dialog'
import {Provider} from 'react-redux'
import {offline} from '@redux-offline/redux-offline';
import config from '@redux-offline/redux-offline/lib/config';
import { RESET_STATE } from "@redux-offline/redux-offline/lib/constants";

const rootReducer = combineReducers({
    user: userReducer,
    requests: requestsReducer,
    locker: lockerReducer,
    login: loginReducer,
    dialog: dialogReducer,
});

const store = createStore(rootReducer, offline(config));
store.dispatch({ type: RESET_STATE });


const app = (
    <BrowserRouter>

        <App/>

    </BrowserRouter>
);

ReactDOM.render(
    <Provider store={store}>{app}</Provider>,
    document.getElementById('root')
);


//service worker
// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register')
} else {
    //Register the ServiceWorker
    navigator.serviceWorker.register('service-worker.js', {
        scope: './'
    }).then(function(reg) {
        console.log('Service worker has been registered for scope:'+ reg.scope);
    });
}
