import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from "./User";
import Home from "./Home"
import Upload from "./Upload";
import Comment from "./Comment";
import Navigator from "./Navigator";
import { BrowserRouter as Router, Switch, Route, Link,} from 'react-router-dom'
import './index.css';

ReactDOM.render((
  <Router >
    <Switch>
      <Route path="/user">
        <Navigator>
          <User/>
        </Navigator>
      </Route>
      <Route path="/home">
        <Navigator>
          <Home/>
        </Navigator>
      </Route>
      <Route path="/upload">
        <Navigator>
          <Upload/>
        </Navigator>
      </Route>
      <Route path="/comment">
        <Navigator>
          <User/>
        </Navigator>
      </Route>
      <Route path="/">
        <Navigator>
          <App/>
        </Navigator>
      </Route>
    </Switch>
  </Router>),
  document.getElementById('root')
);
