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
    
 //  const baseUrl="http://localhost:8085/api/";

useEffect (()=>{
    
     
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      
        if (this.readyState === 4) {
    
            setUpcoming(
                JSON.parse(this.responseText).movies
            );
        }
    });

    xhr.open("GET", props.baseUrl + "movies?status=PUBLISHED");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);

    // Get released movies
    let dataReleased = null;
    let xhrReleased = new XMLHttpRequest();
    xhrReleased.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            setRelease(
                JSON.parse(this.responseText).movies
            );
        }
    });

    xhrReleased.open("GET", props.baseUrl + "movies?status=RELEASED");
    xhrReleased.setRequestHeader("Cache-Control", "no-cache");
    xhrReleased.send(dataReleased);

    // Get filters
    let dataGenres = null;
    let xhrGenres = new XMLHttpRequest();
    xhrGenres.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            setgenresList(
            JSON.parse(this.responseText).genres
            );
        }
    });

    xhrGenres.open("GET", props.baseUrl + "genres");
    xhrGenres.setRequestHeader("Cache-Control", "no-cache");
    xhrGenres.send(dataGenres);

    // Get artists
    let dataArtists = null;
    let xhrArtists = new XMLHttpRequest();
    xhrArtists.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            setartistList(
                 JSON.parse(this.responseText).artists
            );
        }
    });

    xhrArtists.open("GET",props.baseUrl + "artists");
    xhrArtists.setRequestHeader("Cache-Control", "no-cache");
    xhrArtists.send(dataArtists);
    
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

    console.log(genres1)
      //  this.componentDidMount();
       // console.log(this.state);
       let queryString = "?status=RELEASED";
        if (movieName !== "") {
            queryString += "&title=" + movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + genres.toString();
        }
        if (artists.length > 0) {
            queryString += "&artists=" + artists[1].toString();
        }
        if (releaseDateStart !== "") {
            queryString += "&start_date=" + releaseDateStart;
        }
        if (releaseDateEnd !== "") {
            queryString += "&end_date=" + releaseDateEnd;
        }

    
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                setRelease(JSON.parse(this.responseText).movies);
            }
        });

        xhrFilter.open("GET", props.baseUrl + "movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter);
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
                                                <Checkbox checked={genres1.indexOf(genre.name) > -1} />
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
                                                <Checkbox checked={artists.indexOf(artist[1].first_name ) > -1} />
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