import React, { Component } from 'react';
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
      error: 0,
      isRegister:isRegister,
      showForm: 0,
    };
  }
  handleClick() {
    const {username, password} = this.state;
    if(username&&password) {
      fetch("/api/create_user", {
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
            this.setState({open: true, msg: result.msg, success: result.code});
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
            {this.state.isRegister?"Register":"Sign in(Developing)"}
          </Typography>
          <form noValidate>
            <TextField id="username" onChange={e => this.setState({username:e.target.value})} label="Username" variant="outlined" margin="normal" fullWidth/>
            <TextField id="password" onChange={e => this.setState({password:e.target.value})} label="Password" type="password" variant="outlined" margin="normal" fullWidth/>
            <Button variant="contained" color="primary" onClick={()=>this.handleClick()} fullWidth>Register</Button>
            <Snackbar open={this.state.open} onClose={()=>this.handleClose()} message={this.state.msg}>
            </Snackbar>
          </form>
        </div>
      </Container>
    );
  }
}
export default User;