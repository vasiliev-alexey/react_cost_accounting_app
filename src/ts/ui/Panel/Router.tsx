import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Task } from '../Task/Task';
import { MainPanel } from '../About/MainPanel';
import { Settings } from './Settings/Settings';
import { Costs } from './Costs/Costs';
import { Statistics } from './Statistics/Statistics';

const Routes = (): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={MainPanel} />
      <Route path="/task" component={Task} />
      <Route path="/settings" component={Settings} />
      <Route path="/costs" component={Costs} />
      <Route path="/statistics" component={Statistics} />
    </Switch>
  </Switch>
);
export default Routes;
