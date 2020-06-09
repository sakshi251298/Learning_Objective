import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class Level extends React.Component{
constructor(){
super();
this.state={ levelName:'', levelDescription:'' , taxoOptions:[] , taxoId:''}
}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Level name : " + this.state.levelName)
console.log("Level description : " + this.state.levelDescription)
console.log("Taxo Id :" + this.state.taxoId)
const url ="http://localhost:8080/api/levels/taxonomies/"+this.state.taxoId
console.log(url)
const data = { levelName:this.state.levelName, levelDescription:this.state.levelDescription }

fetch(url, { method: 'POST', // or ‘PUT’
body: JSON.stringify(data), // data can be `string` or {object}!
headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }


componentDidMount() {
  let initialTaxo = [];
  fetch("http://localhost:8080/api/taxonomies", {
    headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"}
  }
  )
      .then(response => {
          return response.json();
      }).then(data => {
        console.log(data)
      initialTaxo = data.map(taxo => {
          return taxo
      });
      console.log(initialTaxo);
      this.setState({
          taxoOptions: initialTaxo,
      });
      // console.log(this.setState.taxoOptions)
  });
}

render(){
  let optionItems = this.state.taxoOptions.map((taxos) =>
                <option value={taxos.taxoId} key={taxos.taxoId}>{taxos.taxoName}</option>
            );
return(
    <MDBContainer>
     <MDBRow><MDBCol md="3"></MDBCol><MDBCol md="6">
<form onSubmit={this.handleSubmit}>
<MDBInput  type="text" label="Level name" outline name="levelName" onChange={this.handleChange} />
<MDBInput type="textarea" rows='5' label="Level Description" outline name="levelDescription" onChange={this.handleChange} />
{/* <select
          options={this.state.taxoOptions}
          selected="Choose your option"
          label="Taxo Name"
        /> */}
        <select className="browser-default custom-select" name="taxoId" onChange={this.handleChange}>
          <option disabled selected hidden>Select Taxonomy Name</option>
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


export default Level