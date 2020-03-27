import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from "./User";
import Home from "./Home"
import Navigator from "./Navigator";
import { BrowserRouter as Router, Switch, Route, Link,} from 'react-router-dom'
import './index.css';

ReactDOM.render((
  <Router >
    <Switch>
      <Route path="/user">
        <Navigator/>
        <User/>
      </Route>
      <Route path="/home">
        <Navigator/>
        <Home/>
      </Route>
      <Route path="/">
        <Navigator/>
        <App/>
      </Route>
    </Switch>
  </Router>),
  document.getElementById('root')
);
