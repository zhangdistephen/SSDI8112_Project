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
    let s = queryString.parse(location.search);
    let movie_id = parseInt(s.movie_id);
    this.state = {
      cmmt:"",
      movie_id:movie_id,
      open:false,
      msg:"",
      error:1
    };
  }

  handleClick(){
  const {cmmt, movie_id} = this.state;
  const user = localStorage.getItem("user");
  if(cmmt){
      fetch("/api/comment",{
      body: JSON.stringify({user, movie:movie_id, comment:cmmt}),
      method: 'POST',
      accept: 'application/json',
      headers: {
        'content-type':'application/json'
        },
   })
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({open:true,error:0,msg:"Comment Uploaded"})});
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
            <TextField id="cmmt" onChange={e => this.setState({cmmt:e.target.value})} label="Comment" multiline rows={4} variant="outlined" margin="normal" fullWidth/>
            <Button variant="contained" color="primary" onClick={()=>this.handleClick()} fullWidth>Comment</Button>
            <Snackbar open={this.state.open} onClose={()=>this.handleClose()} message={this.state.msg}>
            </Snackbar>
          </form>
        </div>
        {this.state.error === 0?<Redirect to={"/movie?movie_id="+this.state.movie_id}/>:<div/>}
      </Container>
    );
  }
}
export default Comment;