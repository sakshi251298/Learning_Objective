import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';




class Verb extends React.Component{
constructor(){
super();
this.state={ verbName:'' , levelOptions:[] , levelId:''}
}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Verb name : " + this.state.verbName)
console.log("Level Id :" + this.state.levelId)
const url ="http://localhost:8080/api/verbs/levels/"+this.state.levelId
const data = { verbName:this.state.verbName}

fetch(url, { method: 'POST', // or ‘PUT’
body: JSON.stringify(data), // data can be `string` or {object}!
headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }

componentDidMount() {
  let initialLevel = [];
  fetch("http://localhost:8080/api/levels", {
    headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"}
  }
  )
      .then(response => {
          return response.json();
      }).then(data => {
        console.log(data)
      initialLevel = data.map(level => {
          return level
      });
      console.log(initialLevel);
      this.setState({
          levelOptions: initialLevel,
      });
      // console.log(this.setState.taxoOptions)
  });
}

render(){
  let optionItems = this.state.levelOptions.map((levels) =>
                <option value={levels.levelId} key={levels.levelId}>{levels.levelName}</option>
            );
return(
    <MDBContainer>
     <MDBRow><MDBCol md="3"></MDBCol><MDBCol md="6">
<form onSubmit={this.handleSubmit}>
<MDBInput  type="text" label="Verb name" outline name="verbName" onChange={this.handleChange} />
<select className="browser-default custom-select" name="levelId" onChange={this.handleChange}>
          <option disabled  hidden selected>  Level</option>
          {optionItems}
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


export default Verb