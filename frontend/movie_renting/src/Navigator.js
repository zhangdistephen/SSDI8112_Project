import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
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
      <Grid container direction="column" style={{minHeight:"100vh"}}>
        <AppBar position="static" style={{backgroundColor:"#f5f5f5"}}>
          <Toolbar>
            <Typography variant="h6" style={{textDecoration:"none"}} color="black" component={Link} to="/">
              Movie Renting System
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{flex: "1", backgroundColor:"#ffffff"}}>
          {this.props.children}
        </div>
        <Divider/>
        <Grid container width="100%" style={{backgroundColor: '#f5f5f5', height:"100px"}} alignItems="center" justify="center" >
          <Typography component="p" style={{  height: '100px', color:"black", lineHeight:"100px"}} >
            Copyright © 2020
          </Typography>
        </Grid>
      </Grid>
    )
  }

}

export default Navigator;