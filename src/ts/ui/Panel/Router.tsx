import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Task } from './Task/Task';
import { MainPanel } from './Panel/MainPanel';

const Routes = (): React.ReactElement => (
  <React.StrictMode>
    <Switch>
      <Switch>
        <Route exact path="/" component={MainPanel} />
        <Route path="/task" component={Task} />
      </Switch>
    </Switch>
  </React.StrictMode>
);
export default Routes;
