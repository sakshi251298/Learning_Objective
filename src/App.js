import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Create from './Create';


import './App.css';

  
  class App extends React.Component {
    render() {
        return (
            // <Comment Comment={this.state.Comment} />
            <Router>
//           @List Create new link 
                <ul>
                    <li><Link to='/create'>Create</Link></li>
                </ul>
                <Route path='/create' component={Create} />
              
            </Router>
        )
    }




}

export default App;
