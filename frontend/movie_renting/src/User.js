import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import queryString from "query-string"
const login_style = {
  marginTop: 64,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
class User extends Component{
  constructor(props) {
    super(props);
    // let isRegister = props.location.search.isRegister;
    let s = queryString.parse(location.search);
    let isRegister = ("isRegister" in s)?parseInt(s.isRegister):0;
    this.state = {
      username:"",
      password:"",
      open: false,
      msg: "",
      error: 1,
      isRegister:isRegister,
      showForm: 0,
      balance:0
    };
  }

  handleClick() {
    const {username, password} = this.state;
    if(username&&password) {
      fetch(this.state.isRegister?"/api/create_user":"/api/login", {
        body: JSON.stringify({username, password}),
        method: 'POST',
        accept: 'application/json',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if(result.code===0) {
              localStorage.setItem("user", username);
              localStorage.setItem("balance", result.user.balance);
            }
            this.setState({open: true, msg: result.msg, error: result.code});
          });
    } else {
      this.setState({open:true, msg:"username or password is invalid"});
    }
  }
  handleClose(){
    this.setState({open:false})
  }
  render() {
    return (
      <Container maxWidth="xs">
        <div style={login_style}>
          <Typography component="h1" variant="h5">
            {this.state.isRegister?"Register":"Log in"}
          </Typography>
          <form noValidate>
            <TextField id="username" onChange={e => this.setState({username:e.target.value})} label="Username" variant="outlined" margin="normal" fullWidth/>
            <TextField id="password" onChange={e => this.setState({password:e.target.value})} label="Password" type="password" variant="outlined" margin="normal" fullWidth/>
            <Button variant="contained" color="primary" onClick={()=>this.handleClick()} fullWidth>{this.state.isRegister?"Register":"Log in"}</Button>
            <Snackbar open={this.state.open} onClose={()=>this.handleClose()} message={this.state.msg}>
            </Snackbar>
          </form>
        </div>
        {this.state.error === 0?<Redirect to="/home"/>:<div/>}
      </Container>
    );
  }
}
export default User;