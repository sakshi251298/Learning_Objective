import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';




class Topic extends React.Component{
constructor(){
super();
this.state={ topicName:'' , subjectOptions:[] , subjectId:''}
}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Topic name : " + this.state.topicName)
console.log("Suject Id :" + this.state.subjectId)
const url ="http://localhost:8080/api/topics/subjects/"+this.state.subjectId
const data = { topicName:this.state.topicName}

fetch(url, { method: 'POST', // or ‘PUT’
body: JSON.stringify(data), // data can be `string` or {object}!
headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }

componentDidMount() {
  let initialSubject = [];
  fetch("http://localhost:8080/api/subjects/", {
    headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"}
  }
  )
      .then(response => {
          return response.json();
      }).then(data => {
        console.log(data)
      initialSubject = data.map(subject => {
          return subject
      });
      console.log(initialSubject);
      this.setState({
          subjectOptions: initialSubject,
      });
      // console.log(this.setState.taxoOptions)
  });
}

render(){
  let optionItems = this.state.subjectOptions.map((subjects) =>
                <option value={subjects.subjectId} key={subjects.subjectId}>{subjects.subjectName}</option>
            );
return(
    <MDBContainer>
     <MDBRow><MDBCol md="3"></MDBCol><MDBCol md="6">
<form onSubmit={this.handleSubmit}>
<MDBInput  type="text" label="Topic name" outline name="topicName" onChange={this.handleChange} />
<select className="browser-default custom-select" name="subjectId" onChange={this.handleChange}>
          <option disabled  hidden selected> Subject</option>
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


export default Topic