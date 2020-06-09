import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class Field extends React.Component{
constructor(){
super();
this.state={ fieldName:'' , domainOptions: [], flag:'true' , domainId:''}

}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Field name : " + this.state.fieldName)
console.log("Domain Id :" + this.state.domainId)
const url ="http://localhost:8080/api/fields/domains/"+this.state.domainId
const data = { fieldName:this.state.fieldName }

fetch(url, { method: 'POST', // or ‘PUT’
body: JSON.stringify(data), // data can be `string` or {object}!
headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }



componentDidMount() {
  
  let initialDomain = [];
  fetch("http://localhost:8080/api/domains", {
    headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"}
  }
  ).then(response => {
          return response.json();
      }).then(data => {
        // console.log(data)
      initialDomain = data.map(domain => {
          return domain
      });
      // console.log(initialDomain);
      this.setState({
        domainOptions: initialDomain,
      });
      console.log("INSIDE FETCH",this.state.domainOptions)
    });

    
}



render(){
  console.log(this.state.domainOptions)
  console.log(typeof this.state.domainOptions)
  if( typeof this.state.domainOptions == 'undefined' ) {
      return <div> Loading idoit  </div>
  }
  else {
    console.log("INSIDE RENDER",this.state.domainOptions)
      let domainItems = this.state.domainOptions.map((domains) => 
                    <option value={domains.domainId} key={domains.domainId}>{domains.domainName}</option>
       );
      return(
          <MDBContainer>
          <MDBRow><MDBCol md="3"></MDBCol><MDBCol md="6">
      <form onSubmit={this.handleSubmit}>
      <MDBInput  type="text" label="Field name" outline name="fieldName" onChange={this.handleChange} />
      <select className="browser-default custom-select" name="domainId" onChange={this.handleChange}>
                <option>Domain name</option>
                {domainItems}
                {/* <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option> */}
              </select>
      <MDBBtn type="submit" value="Submit">Submit</MDBBtn></form>
      </MDBCol>
        </MDBRow>
      </MDBContainer> )
      }

  }
}


export default Field