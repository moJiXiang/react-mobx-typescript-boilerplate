import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { Root } from 'src/routes/Root';

const { Suspense, lazy } = React;

const Home = lazy(() => import('src/routes/Home'));
const TodoApp = lazy(() => import('src/routes/TodoApp'));

export const App = hot(module)(() => (
  <Root>
    <Suspense fallback={<div>loading...</div>}>
      <Switch>

        {/* TODO: https://github.com/ReactTraining/react-router/issues/6420 */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={(props) => <Home {...props}/>} />
        <Route path="/todoapp" component={(props) => <TodoApp {...props} />} />
      </Switch>
    </Suspense>
  </Root>
));
