import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
  }
  render() {
    // const {items} = this.state;
    return (
      <div className="App">
        <Grid container spacing={3} justify="center" alignItems="center" style={{marginTop: 200}}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Typography component="h1" variant="h5">
                Welcome
              </Typography>
              <Grid container xs={12} justify="center" alignItems="center" style={{height: 200}}>
                <Grid item xs={5} justify="center" alignItems="center">
                  <Button variant="outlined" color="primary" component={Link} to={{
                    pathname: '/user',
                    search: "?isRegister=1",
                  }}>
                    Create User
                  </Button>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs={5} justify="center" alignItems="center">
                  <Button variant="outlined" color="default" component={Link} to={{
                    pathname: '/user',
                    search: "?isRegister=0",
                  }}>Sign in</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
