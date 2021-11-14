import React,{Component} from 'react';
import Header from '../../common/header/Header';
import  './Home.css';
import { ImageList as GridList} from '@material-ui/core';
//import { ImageListItem as GridlistTile } from '@material-ui/core';
import {ImageListItemBar as GridListTileBar } from '@material-ui/core'
import {ImageListItem as GridListTile } from '@material-ui/core'
import moviesData from '../../common/moviesData';

//import { ImageListItemBar } from '@material-ui/core';
//import GridList from '@material-ui/core/GridList';
//import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import genres from '../../common/genre';
import artists from '../../common/artists';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { blue } from '@material-ui/core/colors';
import { formGroupClasses } from '@mui/material';
   const style= {
       upcomingMoviesHeading : {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
       },
       gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
       // margin: spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
       // color: theme.palette.primary.light,
    }
    }

class Home extends Component{
    constructor() {
        super();
    this.state={
       upcoming :[]  ,
       released:[],
       genresList:[],
       artistList:[],
       genres: [],
       artists: [],
       movieName:"",
       releaseDateStart: "",
       releaseDateEnd: ""
    

    }
   
}
componentDidMount() {


   Object.entries(genres).map(item=>{
      let genre1={
         id:"",name:""
       }
       const copyofgenres=this.state.genresList;
   
        genre1.id=item[1].id;
    genre1.name=item[1].name;
    // 
        copyofgenres.push({...genre1});
        this.setState({...this.state,genresList:copyofgenres});
     
   })
   Object.entries(artists).map(item=>{
    let artists1={
       id:"",first_name:"",last_name:""
     }
     const copyofartists=this.state.artistList;
 //
      artists1.id=item[1].id;
  artists1.first_name =item[1].first_name;
  artists1.last_name =item[1].first_name;
 
      copyofartists.push({...artists1});
      this.setState({...this.state,artistsList:copyofartists});
   
 })

          Object.entries(moviesData).map(item => {
            let movieDetail={id:"",poster_url:"",title:"" ,releasedDate:"",art:"",gen:[]}

      
           const copyofState1=this.state.upcoming;
           const copyofState2=this.state.released;
          movieDetail.poster_url=item[1].poster_url
          movieDetail.title=item[1].title;
          let arr=item[1].release_date.split("T", 1);
          
          movieDetail.releasedDate=arr[0];
         // console.log(movieDetail.releasedDate)
         // let date= new Date(movieDetail.releasedDate);
        //  console.log(date)
          movieDetail.art=item[1].artists[0].first_name;
         // console.log(item);
        // console.log(item[1].genres[0]);
         for(var i=0; i<item[1].genres.length; i++){
             movieDetail.gen[i]=item[1].genres[i];

         }
         // console.log(movieDetail);
          movieDetail.id=item[1].id;
           copyofState1.push({...movieDetail});
           copyofState2.push({...movieDetail});
         
            this.setState({...this.state,released:copyofState2,upcoming:copyofState1});
          
        
            

          })

    
    }
    movieNameChangeHandler = event => {
       this.setState({ movieName: event.target.value });
       
    }

    genreSelectHandler = event => {
      this.setState({ ...this.state,genres: event.target.value });
    }

    artistSelectHandler = event => {
       this.setState({ ...this.state,artists: event.target.value });
    }

    releaseDateStartHandler = event => {
       this.setState({ ...this.state,releaseDateStart: event.target.value });
       

    }

    releaseDateEndHandler = event => {
        this.setState({ ...this.state,releaseDateEnd: event.target.value });
        
    }

    movieClickHandler = (id) => {
           console.log(id);
        this.props.history.push('movie/' + id);
    }

    filterApplyHandler = () => {
//debugger;

        this.setState({...this.state,released:[]}); 
      //  this.componentDidMount();
       // console.log(this.state);
        var rel=[];
    console.log(rel);

       
          if (this.state.movieName !== "") {
              
              this.state.upcoming.map((details)=>{
                  if(this.state.movieName==details.title){
               // console.log(this.state.movieName);
                  //console.log(details.title);
                 
                     rel.push({...details});
                  }
              })
              
           ;
           
      }
         if (this.state.genres.length > 0) {
            this.state.genres.map((item)=>{
               // console.log("artlist"+item);
               this.state.upcoming.map((details)=>{
               // console.log("movlist"+details.);
           
                if(item===details.gen[0] || item===details.gen[1]){
                   // console.log(item);
    
                     console.log(details.art);
                     rel.push({...details});
                    // console.log(rel);
                    
                }
    
               })
            })
         }
        
         if (this.state.artists.length > 0) {
           
            this.state.artists.map((item)=>{
            console.log("artlist"+item);
           this.state.upcoming.map((details)=>{
            console.log("movlist"+details.art);
         
            if(item===details.art){
              //  console.log(item);

                 console.log(details.art);
                 rel.push({...details});
               //  console.log(rel);
                
            }

           })
        })
        console.log(rel);
        
        
         }
         

         if (this.state.releaseDateStart !== "") {
            this.state.upcoming.map((details)=>{
              let dateofmovie=new Date(details.releasedDate);
              //  console.log("moviedate "+dateofmovie);
                let dateSelected= new Date(this.state.releaseDateStart);
            

                if(dateSelected.getTime()<=dateofmovie.getTime()){
                
        
            
              
                   rel.push({...details});
                   
    
                }
            })
    
            

         }
       if (this.state.releaseDateEnd !== "") {
        this.state.upcoming.map((details)=>{
            let dateofmovie=new Date(details.releasedDate);
           // console.log("moviedate "+dateofmovie);
            let dateSelected= new Date(this.state.releaseDateEnd);
            

            if(dateSelected.getTime()>=dateofmovie.getTime()){
            
    
        
        
               rel.push({...details});
            
            }
        })

         }

        this.setState({...this.state,released:rel}); 
    }
    
    
   
    render(){
    //    console.log("render");
    
        return (<div>
       <Header></Header>
        <div style={style.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
        </div>
        
        
        <GridList cols={6} style={style.gridListUpcomingMovies} >
                    {this.state.upcoming.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList rowHeight={350} cols={4} style={style.gridListMain}>
                            {this.state.released.map(movie => (
                                <GridListTile onClick={() => this.movieClickHandler(movie.id)}  className="released-movie-grid-item"  key={movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.releasedDate).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="right">
                    <Card>
                            <CardContent>
                                <FormControl style={style.formControl}>
                                    <Typography style={style.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.movieNameChangeHandler} />
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}
                                    >
                                        {this.state.genresList.map((genre) => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                                                <ListItemText primary={genre.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistSelectHandler}
                                    >
                                        {this.state.artistList.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name }>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name ) > -1} />
                                                <ListItemText primary={artist.first_name } />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateStartHandler}
                                    />
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.releaseDateEndHandler}
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl style={style.formControl}>
                                    <Button onClick={() => this.filterApplyHandler()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                    </div>

       
    
        
        
        </div>);
    
    }
}
export default Home;