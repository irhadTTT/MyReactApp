import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import dataBuilderReducer from '../src/store/reducer/data';
import authBuilderReducer from '../src/store/reducer/auth'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
  dataBuilder: dataBuilderReducer,
  authReducer: authBuilderReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store ={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
 </Provider>
)
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
