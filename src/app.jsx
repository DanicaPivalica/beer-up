import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import ReactModal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';

import '../assets/scss/app.scss';
import { configureStore } from './app/store';
import { Routes } from './app/routes';


ReactModal.setAppElement('#app');
const store = configureStore({ }, thunk);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
  , document.getElementById('app'),
);

