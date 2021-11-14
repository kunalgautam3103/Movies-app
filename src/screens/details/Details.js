import React,{ Component } from "react";
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
//import { ImageListItem as GridlistTile } from '@material-ui/core';
import {ImageListItemBar as GridListTileBar } from '@material-ui/core'
import {ImageListItem as GridListTile } from '@material-ui/core'
import { ImageList as GridList } from '@material-ui/core'
import YouTube from 'react-youtube';
//import GridList from '@material-ui/core/GridList';
//import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';
import moviesData from "../../common/moviesData";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                
                    id:[],
                    title:"",
                    genres: [],
                    trailer_url: "",
                    artists: [],
                    releasedDate:"",
                    poster_url:"",
                     rating:"",
                    plot:"",
                    duration:""
                    
    
    
                
            },
            starIcons: [{
                id: 1,
                stateId: "star1",
                color: "black"
            },
            {
                id: 2,
                stateId: "star2",
                color: "black"
            },
            {
                id: 3,
                stateId: "star3",
                color: "black"
            },
            {
                id: 4,
                stateId: "star4",
                color: "black"
            },
            {
                id: 5,
                stateId: "star5",
                color: "black"
            }]
        }
    }

    componentDidMount() {
        const id=this.props.match.params.id;
        Object.entries(moviesData).map(item =>{
          if(item[1].id==id){
              let copyMovie={
                id:[],
                title:"",
                genres: [],
                trailer_url: "",
                artists: [],
                releasedDate:"",
                poster_url:"",
                rating:"",
                plot:"",
                duration:"",
                wiki_url:""
                }
                copyMovie.id=item[1].id;
                copyMovie.title=item[1].title;
                copyMovie.genres=item[1].title;
                copyMovie.trailer_url=item[1].trailer_url;
                copyMovie.releasedDate=item[1].release_date;
                copyMovie.poster_url=item[1].poster_url;
                copyMovie.rating=item[1].critics_rating;
                copyMovie.plot=item[1].storyline;
                copyMovie.wiki_url=item[1].wiki_url;
                copyMovie.duration=item[1].duration;
                let rel=[];
               Object.entries(item[1].artists).map((details)=>{
                   console.log(details[1]);
              
             let copyArtist={id:"",first_name:"",last_name:"",profile_url:"",wiki_url:""};
            
               console.log(typeof copyArtist)
                copyArtist.id=details[1].id;
                copyArtist.first_name=details[1].first_name;
                copyArtist.last_name=details[1].last_name;
               copyArtist.profile_url=details[1].profile_url;
               copyArtist.wiki_url=details[1].wiki_url;
               rel.push({...copyArtist});
               console.log(rel)
             //  this.setState({...this.state,movie:{...this.state.movie,artist:{...rel}}})
              // console.log(this.state)
               
        })
            //     copyArtist[1].id=item[1].artists[1].id;
            //     copyArtist[1].first_name=item[1].artists[1].first_name;
            //     copyArtist[1].last_name=item[1].artists[1].last_name;
            //     copyArtist[1].profile_url=item[1].artists[1].profile_url;
            //     copyArtist[1].wiki_url=item[1].artists[1].wiki_url;

            
                console.log(rel);
                copyMovie.artists=rel;
               // console.log(item[1].artists[0].wiki_url);
               // copyMovie.artists[0]={id="",first_name:"",last_name:"",profile_url:"",wiki_url=""}
            console.log(copyMovie);

              this.setState({...this.state,movie:copyMovie})
              console.log(this.state);

          }
        
         } )
        
    
    }

    artistClickHandler = (url) => {
        window.location = url;
    }

    starClickHandler = (id) => {
        let starIconList = [];
        for (let star of this.state.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        this.setState({ starIcons: starIconList });
    }

    render() {
        let movie = this.state.movie;
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return (
            <div className="details">
                <Header id={this.props.match.params.id} showBookShowButton="true" />
                <div className="back">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>
                <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img src={this.state.movie.poster_url} alt={this.state.movie.title} />
                    </div>

                    <div className="middleDetails">
                        <div>
                            <Typography variant="headline" component="h2">{this.state.movie.title} </Typography>
                        </div>
                        <br />
                        <div>
                            <Typography>
                                <span className="bold">Genres: </span> 
                            </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold">Duration:</span> {this.state.movie.duration} </Typography>
              
                        </div>
                        <div>
                            <Typography><span className="bold">Release Date:</span> {new Date(this.state.movie.release_date).toDateString()} </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold"> Rating:</span> {this.state.movie.rating}  </Typography>
                        </div>
                        <div className="marginTop16">
                            <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {this.state.movie.plot} </Typography>
                        </div>
                        <div className="trailerContainer">
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
                            <YouTube
                                videoId={movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            />
                        </div>
                    </div>

                    <div className="rightDetails">
                        <Typography>
                            <span className="bold">Rate this movie: </span>
                        </Typography>
                        {this.state.starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => this.starClickHandler(star.id)}
                            />
                        ))}

                        <div className="bold marginBottom16 marginTop16">
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                        </div>
                        <div className="paddingRight">
                            <GridList rowHeight={160} cols={2}>
                                {movie.artists != null && movie.artists.map(artist => (
                                    <GridListTile
                                        className="gridTile"
                                        onClick={() => this.artistClickHandler(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;