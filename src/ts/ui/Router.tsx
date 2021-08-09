import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Task from './Panel/Task/Task';
import { MainPanel } from './About/MainPanel';
import Settings from './Panel/Settings/Settings';

import CostsContainer from './Panel/Costs/CostsContainer';
import Login from './Login/Login';
import TaskList from './Panel/Task/TaskList';
import Statistics from './Panel/Statistics/Statistics';
import withAuthentication from './utils/requireAuth';
import { RootState } from '../store/store';
import { connect } from 'react-redux';

const Routes = (
  props: ReturnType<typeof mapStateToProps>
): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={MainPanel} />
      <Route path="/task" component={Task} />
      <Route
        path="/settings"
        component={withAuthentication(Settings, props.isAuthenticated)}
      />
      <Route
        path="/costs"
        component={withAuthentication(CostsContainer, props.isAuthenticated)}
      />
      <Route
        path="/statistics"
        component={withAuthentication(Statistics, props.isAuthenticated)}
      />
      <Route path="/sign-in" component={Login} />
      <Route path="/taskList" component={TaskList} />
    </Switch>
  </Switch>
);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Routes);
