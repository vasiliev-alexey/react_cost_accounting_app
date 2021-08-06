import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Task } from './Task/Task';
import { MainPanel } from './About/MainPanel';
import Settings from './Panel/Settings/Settings';
import { Statistics } from './Panel/Statistics/Statistics';
import CostsContainer from './Panel/Costs/CostsContainer';
import Login from './Login/Login';

const Routes = (): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={MainPanel} />
      <Route path="/task" component={Task} />
      <Route path="/settings" component={Settings} />
      <Route path="/costs" component={CostsContainer} />
      <Route path="/statistics" component={Statistics} />
      <Route path="/sign-in" component={Login} />
    </Switch>
  </Switch>
);
export default Routes;
