import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './ui/App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
