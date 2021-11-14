import React,{Component} from "react";

import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
//import{ Route,Routes}  from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class Controller extends Component {

    constructor() {
      super();
    
    }
    render() {
      return (
        <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props}  />} />
          <Route path='/movie/:id' render={(props) => <Details {...props}  />} />
          
        </div>
      </Router>
        
    
      )
    }
  }
  
  export default Controller;