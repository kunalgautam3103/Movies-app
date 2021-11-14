import React,{ Component } from "react";
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';

let logocss = {
    animation: 'app-logo-spin infinite 8s linear',
    height: '35px' ,
    background: '#ff7f7f'
 };
 class Header extends Component{
  constructor() {
    super();
    this.state = {
        
        loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    }
}

   render(){
       return <header className="app-header">
       <img src={logo} className="app-logo" alt="Movies App Logo" />
       {!this.state.loggedIn ?
           <div className="login-button">
               <Button variant="contained" color="default" >
                   Login
               </Button>
           </div>
           :
           <div className="login-button">
               <Button variant="contained" color="default" >
                   Logout
               </Button>
           </div>
       }
       {this.props.showBookShowButton === "true" && !this.state.loggedIn
           ? <div className="bookshow-button">
               <Button variant="contained" color="primary" >
                   Book Show
               </Button>
           </div>
           : ""
       }

       {this.props.showBookShowButton === "true" && this.state.loggedIn
           ? <div className="bookshow-button">
               <Link to={"/bookshow/" + this.props.id}>
                   <Button variant="contained" color="primary">
                       Book Show
                   </Button>
               </Link>
           </div>
           : ""
       }

   </header>
   }
 }
 export default Header;