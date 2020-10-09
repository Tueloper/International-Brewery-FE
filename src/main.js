import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import {
  ErrorPage,
  Signup,
} from 'pages';
import { Layout, Nav } from './components';

const Main = () => (
  <Provider store={store}>
    <Nav />
    <Layout>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route exact path='/404' component={ErrorPage} />
        <Redirect to="/404" />
      </Switch>
    </Layout>
  </Provider>

);

export default Main;
