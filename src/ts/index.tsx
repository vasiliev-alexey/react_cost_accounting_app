import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './ui/App';
import { store } from './store/store';
import { Provider } from 'react-redux';
//import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
