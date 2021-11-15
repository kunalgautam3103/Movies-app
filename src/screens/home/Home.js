import React,{Component, useEffect, useState} from 'react';
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

function Home(props) {
    
     
    const [upcoming,setUpcoming]=useState([]);
    const [released,setRelease]=useState([]);
    const [genresList,setgenresList]=useState([]);
    const [genres1,setgenres]=useState([]);
    const [artists1,setartists]=useState([]);
    const [movieName,setmovieName]=useState("");
    const [releaseDateEnd,setreleasedDateEnd]=useState("");
    const [releaseDateStart,setreleasedDateStart]=useState("as");
    const [artistList,setartistList]=useState([])
    
   

useEffect (()=>{
    



  console.log("use");
  const copyofgenres=[];
   Object.entries(genres).map(item=>{
       console.log(item[1])
      let genre2={
         id:"",name:""
       }
     
   console.log(typeof copyofgenres)
        genre2.id=item[1].id;
    genre2.name=item[1].name;

        copyofgenres.push({...genre2});
        
        console.log(typeof copyofgenres)
     
   })
   setgenresList({...copyofgenres});
   const copyofartists=[];
   Object.entries(artists).map(item=>{
       
    let artists1={
       id:"",first_name:"",last_name:""
     }
     
 console.log(copyofartists)
      artists1.id=item[1].id;
  artists1.first_name =item[1].first_name;
  artists1.last_name =item[1].first_name;
 
      copyofartists.push({...artists1});
      setartistList({...copyofartists});
      console.log(artistList)
   
 })
 
 const copyofState1=[]
 const copyofState2=[];

          Object.entries(moviesData).map(item => {
              console.log(item[1])
            let movieDetail={id:"",poster_url:"",title:"" ,releasedDate:"",art:"",gen:[]}

      
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
         
            

          })
          setUpcoming({...copyofState1});
        
        
           setRelease({...copyofState2});
        
          
          console.log(typeof genresList);

    
    },[]
)
    function movieNameChangeHandler (event) {
       setmovieName( event.target.value );
       console.log(movieName);
       
    }

    function genreSelectHandler(event) {
    setgenres(event.target.value );
    console.log(genres1);
    }

    function artistSelectHandler(event) {
       setartists(event.target.value );
    }

    function releaseDateStartHandler(event) {

       setreleasedDateStart({...event.target.value} );
       console.log(releaseDateStart)
       

    }

    function releaseDateEndHandler (event) {
        setreleasedDateEnd({ ...event.target.value });
        
    }

    function movieClickHandler(id) {
           console.log(id);
        props.history.push('movie/' + id);
    }

   function  filterApplyHandler ()  {
//debugger;

    console.log(releaseDateStart)
    console.log(typeof releaseDateStart)
    
      //  this.componentDidMount();
       // console.log(this.state);
        var rel=[];
    console.log(rel);

       console.log(genres1);
          if (movieName !== "") {
              
              Object.entries(upcoming).map((details)=>{
                  if(movieName==details[1].title){
               // console.log(this.state.movieName);
                  console.log(details[1].title);
                 
                     rel.push({...details[1]});
                     console.log(rel)
                  }
              })
              
           ;
           
      }
       
         if (genres1.length > 0) {
             console.log("ingeners")
            genres1.map((item)=>{
               // console.log("artlist"+item);

               Object.entries(upcoming).map((details)=>{
               // console.log("movlist"+details.);
           
                if(item===details[1].gen[0] || item===details[1].gen[1]){
                   // console.log(item);
    
                     console.log(details[1].art);
                     rel.push({...details[1]});
                    // console.log(rel);
                    
                }
    
               })
            })
         }
        
         if (artists1.length > 0) {
           
            artists1.map((item)=>{
            console.log("artlist"+item);
           Object.entries(upcoming).map((details)=>{
            console.log("movlist"+details[1].art);
         
            if(item===details[1].art){
              //  console.log(item);

                 console.log(details[1].art);
                 rel.push({...details[1]});
               //  console.log(rel);
                
            }

           })
        })
        console.log(rel);
        
        
         }
         

         if (releaseDateStart !== "") {
             console.log(typeof releaseDateStart)
             let releaseDateStart1=""
            Object.entries(releaseDateStart).map((det)=>{
                console.log(det)
               releaseDateStart1+=det[1];
            })

console.log(releaseDateStart1)
            Object.entries(upcoming).map((details)=>{
              let dateofmovie=new Date(details[1].releasedDate);
              //  console.log("moviedate "+dateofmovie);
                let dateSelected= new Date(releaseDateStart1);
            

                if(dateSelected.getTime()<=dateofmovie.getTime()){
                
        
            
              
                   rel.push({...details[1]});
                   
    
                }
            })
    
            

         }
       if (releaseDateEnd !== "") {
        let releaseDateEnd1=""
        Object.entries(releaseDateEnd).map((det)=>{
            console.log(det)
           releaseDateEnd1+=det[1];
        })
        Object.entries(upcoming).map((details)=>{
            let dateofmovie=new Date(details[1].releasedDate);
           // console.log("moviedate "+dateofmovie);
            let dateSelected= new Date(releaseDateEnd1);
            

            if(dateSelected.getTime()>=dateofmovie.getTime()){
            
    
        
        
               rel.push({...details[1]});
            
            }
        })

         }

        setRelease(rel); 
    }
    
    
   
    
    //    console.log("render");
    
        return (
        <div>
       <Header></Header>
        <div style={style.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
        </div>
        
        
        <GridList cols={6} style={style.gridListUpcomingMovies} >
        {Object.entries(upcoming).map(movie => (
                        <GridListTile key={"upcoming" + movie[1].id}>
                            <img src={movie[1].poster_url} className="movie-poster" alt={movie[1].title} />
                            <GridListTileBar title={movie[1].title} />
                        </GridListTile>
                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList rowHeight={350} cols={4} style={style.gridListMain}>
                            {Object.entries(released).map(movie => (
                                <GridListTile onClick={() => movieClickHandler(movie[1].id)}  className="released-movie-grid-item"  key={movie[1].id}>
                                    <img src={movie[1].poster_url} className="movie-poster" alt={movie[1].title} />
                                    <GridListTileBar
                                        title={movie[1].title}
                                        subtitle={<span>Release Date: {new Date(movie[1].releasedDate).toDateString()}</span>}
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
                                    <Input id="movieName" onChange={movieNameChangeHandler} />
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={genres1}
                                        onChange={genreSelectHandler}
                                    >
                                        {Object.entries(genresList).map((genre) => (
                                            <MenuItem key={genre[1].id} value={genre[1].name}>
                                                <Checkbox checked={genres1.indexOf(genre[1].name) > -1} />
                                                <ListItemText primary={genre[1].name} />
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
                                        value={artists1}
                                        onChange={artistSelectHandler}
                                    >
                                        {Object.entries(artistList).map(artist => (
                                            <MenuItem key={artist[1].id} value={artist[1].first_name }>
                                                <Checkbox checked={artists1.indexOf(artist[1].first_name ) > -1} />
                                                <ListItemText primary={artist[1].first_name } />
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
                                        onChange={releaseDateStartHandler}
                                    />
                                </FormControl>

                                <FormControl style={style.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={releaseDateEndHandler}
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl style={style.formControl}>
                                    <Button onClick={() => filterApplyHandler()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                    </div>

       
    
        
        
        </div>);
    
    }

export default Home;