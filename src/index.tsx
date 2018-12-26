import { createBrowserHistory } from 'history';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { TodoModel } from 'src/models';
import { createStore } from 'src/stores';

import { App } from 'src/app';

// enable MobX strict mode
configure({
  enforceActions: 'observed',
});

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true),
];

// init MobX stores
const history = createBrowserHistory();
const rootStore = createStore(history, defaultTodos);

ReactDOM.render(
  <Provider {...rootStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
