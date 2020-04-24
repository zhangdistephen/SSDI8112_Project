import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:""
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1, textDecoration:"none"}} color="inherit" component={Link} to="/">
              Movie Renting System
            </Typography>
            {this.props.user}
            {/*<Button color="inherit" component={Link} to={{*/}
            {/*  pathname: '/user',*/}
            {/*  search: "?isRegister=1",*/}
            {/*}}>Register /</Button>*/}
            {/*<Button color="inherit" component={Link} to={{*/}
            {/*  pathname: '/user',*/}
            {/*  search: "?isRegister=0",*/}
            {/*}}>Log in</Button>*/}
          </Toolbar>
        </AppBar>
      </div>
    )
  }

}

export default Navigator;