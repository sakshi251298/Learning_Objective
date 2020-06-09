import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import { MDBContainer, MDBNavbar, MDBNavbarBrand,MDBDropdown, MDBDropdownToggle, MDBNavbarNav, MDBNavbarToggler, MDBDropdownMenu, MDBDropdownItem,  MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import Taxonomy from './Taxonomy';
import Verb from './Verb';
import Learningobjective from './Learningobjective';
import Level from './Level';
import Domain from './Domain'
import Field from './Field';
import Topic from './Topic';
import Subject from './Subject';



class Create extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  render() {
    const bgcolor = {backgroundColor: '#cff1ef'}
    const container = {height: 1300}
    return(
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgcolor} light expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                  <strong>ET Mantra</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
              <MDBNavbarNav left>
              <MDBNavItem>
                      <MDBNavLink to="/learningobjective">Learning objective</MDBNavLink>
                      
                  </MDBNavItem>
                 </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                      <MDBNavLink to="/taxonomy">Taxonmy</MDBNavLink>
                      
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink to="/level">Level</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink to="/verb">Verb</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/domain">Domain</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/field">Field</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/subject">Subject</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/topic">Topic</MDBNavLink>
                  </MDBNavItem>
                  {/* <MDBNavItem>
              <MDBDropdown >
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Create</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu >
                  <MDBDropdownItem ><Link to='/taxonomy'>Taxonomy</Link></MDBDropdownItem>
                  <MDBDropdownItem  href="/level">Level</MDBDropdownItem>
                  <MDBDropdownItem  href="verb">Verb</MDBDropdownItem>
                  <MDBDropdownItem  href="/domain">Domain</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}
                </MDBNavbarNav>
                
              </MDBCollapse>
            </MDBNavbar>
          </header>
          <MDBContainer style={container} className="text-center mt-5 pt-5">
          <Route path='/learningobjective' component={Learningobjective} />
        <Route path='/taxonomy' component={Taxonomy} />
        <Route path='/level' component={Level} />
        <Route path='/verb' component={Verb} />
        <Route path='/domain' component={Domain} />
        <Route path='/field' component={Field} />
        <Route path='/subject' component={Subject} />
        <Route path='/topic' component={Topic} />
        
        </MDBContainer>
        </Router>
        
      </div>
    );
  }
}

export default Create;