import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConferenceInfo from '../pages/conference/info';
import ConferenceStaffList from '../pages/conference/people/staff/list';
import Dashboard from '../pages/dashboard';
import NoMatch from '../pages/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../pages/login';
import Register from '../pages/register';
import { muiTheme } from '../theme';
import Wrapper from './wrapper';
import Profile from '../pages/conference/people/staff/detail';

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <Route exact path="/register" component={Register} /> {''}
      <Route exact path="/login" component={Login} /> {''}
      {''}
      <Wrapper>
        <Switch>
          <Route exact path="/profile" component={Profile} />{' '}
          <Route exact path="/" component={Dashboard} />{' '}
          <Route path="/conference/info" component={ConferenceInfo} />
          <Route
            path="/conference/people/staff"
            component={ConferenceStaffList}
          />
          <Route component={NoMatch} />{' '}
        </Switch>{' '}
      </Wrapper>
    </Switch>
  </MuiThemeProvider>
);
