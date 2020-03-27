import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
class Home extends Component{
  constructor() {
    super();
    this.state = {
      "user":null
    }
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({user})
  }

  render() {
    return(
      <div style={{"textAlign":'center'}}>
        <Typography component="h1" variant="h5">{"Welcome, "+this.state.user}</Typography>
      </div>
    );
  }

}

export default Home;
