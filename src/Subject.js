import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';




class Subject extends React.Component{
constructor(){
super();
this.state={ subjectName:'' }
}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Subject name : " + this.state.subjectName)
const url ="http://localhost:8080/api/subjects"
const data = { subjectId:this.state.subjectId , subjectName:this.state.subjectName }

fetch(url, { method: 'POST', // or ‘PUT’
body: JSON.stringify(data), // data can be `string` or {object}!
headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }
render(){
return(
    <MDBContainer>
     <MDBRow><MDBCol md="3"></MDBCol><MDBCol md="6">
<form onSubmit={this.handleSubmit}>
<MDBInput  type="text" label="Subject name" outline name="subjectName" onChange={this.handleChange} />

<MDBBtn type="submit" value="Submit">Submit</MDBBtn></form>
</MDBCol>
  </MDBRow>
</MDBContainer> )
}
}


export default Subject