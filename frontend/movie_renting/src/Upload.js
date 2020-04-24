import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import queryString from "query-string"

class Upload extends Component{
  constructor(props) {
    super(props);
    // let isRegister = props.location.search.isRegister;
    this.state = {
      open:false,
      error:1,
      name:"",
      desc:"",
      img:""
    };
  }

  handleClick() {
    const {name, desc, img} = this.state;
    if(name&&desc&&img) {
      fetch("/api/upload_movie", {
        body: JSON.stringify({name, desc, img}),
        method: 'POST',
        accept: 'application/json',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({open:true, error:0, msg:"Upload Success!"});
          });
    } else {
      this.setState({open:true, msg:"Empty text is not acceptable."});
    }
  }
  handleClose(){
    this.setState({open:false})
  }
  render() {
    return (
      <Container maxWidth="lg" style={{padding:10}}>
        <div >
          <Typography component="h1" variant="h5">
            Upload
          </Typography>
          <form noValidate>
            <TextField id="name" onChange={e => this.setState({name:e.target.value})} label="Movie Name" variant="outlined" margin="normal" fullWidth/>
            <TextField id="desc" onChange={e => this.setState({desc:e.target.value})} label="Description" multiline rows={4} variant="outlined" margin="normal" fullWidth/>
            <TextField id="img" onChange={e => this.setState({img:e.target.value})} label="Image"  variant="outlined" margin="normal" fullWidth/>
            <Button variant="contained" color="primary" onClick={()=>this.handleClick()} fullWidth>Upload</Button>
            <Snackbar open={this.state.open} onClose={()=>this.handleClose()} message={this.state.msg}>
            </Snackbar>
          </form>
        </div>
        {this.state.error === 0?<Redirect to="/home"/>:<div/>}
      </Container>
    );
  }
}
export default Upload;