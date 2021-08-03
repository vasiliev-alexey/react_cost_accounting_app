import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Task } from '../Task/Task';
import { MainPanel } from '../About/MainPanel';
import Settings from './Settings/Settings';
import { Statistics } from './Statistics/Statistics';
import CostsContainer from './Costs/CostsContainer';

const Routes = (): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={MainPanel} />
      <Route path="/task" component={Task} />
      <Route path="/settings" component={Settings} />
      <Route path="/costs" component={CostsContainer} />
      <Route path="/statistics" component={Statistics} />
    </Switch>
  </Switch>
);
export default Routes;
