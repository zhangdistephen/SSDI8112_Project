import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import queryString from "query-string"


class Movie extends Component{
  constructor(props) {
    super(props);
    // let isRegister = props.location.search.isRegister;
    let s = queryString.parse(location.search);
    let movie_id = parseInt(s.movie_id);
    this.state = {
      open:false,
      error:1,
      movie_id,
      name:"",
      desc:"",
      img:"",
      price:"",
      comment:""
    };
  }
  componentDidMount() {
    const {movie_id} = this.state;
   fetch("/api/get_movies", {
        method: 'GET',
        accept: 'application/json',
      }).then(result=>result.json())
      .then(result=>{
        if(result.code===0){
          let movies = result.data;
          for(let i=0;i<movies.length;i++){
            if(movies[i].id===movie_id){
              let movie = movies[i];
              this.setState({name:movie.name, desc:movie.desc, img:movie.img, price:movie.price, comment:movie.comment});
            }
          }
        }
      });
  }

  handleClose(){
    this.setState({open:false})
  }
  render() {
    const {name, desc, img, price, comment} = this.state;
    return (
      <Container maxWidth="lg" style={{padding:10}}>
        <Paper elevation={3} >
          <Typography variant="h5" component = "p" style ={{color:"black"}}>Name:{name}</Typography>
          <Typography variant="h5" component = "p" style ={{color:"black"}}>Description:{desc}</Typography>
          <Typography variant="h5" component = "p" style ={{color:"black"}}>Price:${price}</Typography>
          <Typography variant="h5" component = "p" style ={{color:"black"}}>Comment:{comment}</Typography>
        </Paper>
      </Container>
    );
  }
}
export default Movie;