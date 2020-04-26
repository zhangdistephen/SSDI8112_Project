import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import queryString from "query-string"

class Comment extends Component{
constructor(props) {
    super(props);
    // let isRegister = props.location.search.isRegister;
    this.state = {
      cmmt:"",
    };
  }

  handleClick(){
  const cmmt = this.state;
  if(cmmt){
  fetch("/api/comment",{
  body: JSON.stringify(cmmt),
  method: 'POST',
  accept: 'application/json',
  headers: {
    'content-type':'application/json'
    },
   })
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({open:true,error:0,msg:""})});
    }else{
        this.setState({open:true, msg:"Empty text is not acceptable."});
    }
  }



  render() {
    return (
      <Container maxWidth="lg" style={{padding:10}}>
        <div >
          <Typography component="h1" variant="h5">
            Comment
          </Typography>
          <form noValidate>
            <TextField id="cmmt" onChange={e => this.setState({desc:e.target.value})} label="Comment" multiline rows={4} variant="outlined" margin="normal" fullWidth/>
            <Button variant="contained" color="primary" onClick={()=>this.handleClick()} fullWidth>Comment</Button>
            <Snackbar open={this.state.open} onClose={()=>this.handleClose()} message={this.state.msg}>
            </Snackbar>
          </form>
        </div>
        {this.state.error === 0?<Redirect to="/home"/>:<div/>}
      </Container>
    );
  }
}