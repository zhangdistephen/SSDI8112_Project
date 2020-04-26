import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
//"https://material-ui.com/static/images/cards/contemplative-reptile.jpg";
class CustomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg:""
    }
  }

  handleClick() {
    const user = localStorage.getItem("user");
    fetch("/api/rent", {
        body: JSON.stringify({user, movie:this.props.id}),
        method: 'POST',
        accept: 'application/json',
        headers: {
          'content-type': 'application/json'
        },
      }).then(res=>res.json())
      .then(res=>{
        if(res.code === 0) {
          this.setState({open: true, msg: "Successfully rent " + this.props.name});
          localStorage.setItem("balance", res.balance);
          this.props.changeBalance(res.balance);
        } else{
          this.setState({open: true, msg: res.msg});
        }
      })
  }
  handleClose(){
    this.setState({open:false});
  }

  render() {
    const {name, desc, img, price, id} = this.props;
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={img}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick.bind(this)}>
            Rent
          </Button>
          <Button size="small" color="primary" component={Link} to={{
            pathname: '/comment',
            search:"?movie_id="+id,
          }}>
            Comment
          </Button>
          <Typography variant="body2" component="p" style={{marginLeft:"auto", color:"green"}}>
              ${price}
            </Typography>
        </CardActions>
        <Snackbar open={this.state.open} onClose={this.handleClose.bind(this)} message={this.state.msg}/>
      </Card>
    )
  }
}
class Home extends Component{
  constructor() {
    super();
    let balance = localStorage.getItem("balance")
    this.state = {
      user:null,
      balance: balance,
      movies: [],
      search: ""
    }
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({user});
    fetch("/api/get_movies", {
        method: 'GET',
        accept: 'application/json',
      }).then(result=>result.json())
      .then(result=>{
        if(result.code===0){
          this.setState({movies:result.data});
        }
      });
  }


  handleSearch(){
    fetch("/api/get_movies?search="+this.state.search, {
        method: 'GET',
        accept: 'application/json',
      }).then(result=>result.json())
      .then(result=>{
        if(result.code===0){
          this.setState({movies:result.data, search:""});
        }
      });
  }
  changeBalance(balance){
    this.setState({balance:balance});
  }
  render() {
    // const elements = ["1","2","3","4","5"];
    const {movies} = this.state;
    const Cards = movies.map((value, index) => {
      return (
        <Grid item xs={3}>
          <CustomCard name={value.name} desc={value.desc} img={value.img} id={value.id} price={value.price}
                      own={value.own}
                      changeBalance={(val)=> this.changeBalance(val)}/>
        </Grid>
      )
    });
    return (
      <div>
        <Grid container style={{padding: 10}} justify="center" alignItems="center">
          <Button variant="contained"
                  style={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white', margin:"auto"}}
                  component={Link} to={{
            pathname: '/upload',
          }}>Upload Movie</Button>
          <Paper style={{margin:"auto", padding:4}}>
            <InputBase
              placeholder="Search Movies"
              inputProps={{'aria-label': 'search movies'}}
              value={this.state.search}
              onChange={e => this.setState({search:e.target.value})}
            />
            <IconButton aria-label="search" onClick={this.handleSearch.bind(this)}>
              <SearchIcon/>
            </IconButton>
          </Paper>
         <Typography variant="h5" component="p" style={{margin:"auto", color:"green"}}>
              Balance: ${this.state.balance}
            </Typography>
        </Grid>

        <Grid container style={{padding: 50}} spacing={10}>
          {Cards}
        </Grid>
      </div>
    );
  }

}

export default Home;
