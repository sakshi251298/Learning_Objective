import React from "react";
import {  MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// class Taxonomy extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     console.log(this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div>
//       <MDBContainer>
//   <MDBRow>
//     <MDBCol md="6">
//       <form onSubmit={this.handleSubmit} 
//                     action="http://localhost:8080/api/los/"
//                     method="post">
//         <p className="h5 text-center mb-4">Taxanomy</p>
//         <div className="grey-text">
//           <MDBInput label="Taxonomy Name" name="Tax_name" value={this.state.name} onChange={this.handleChange} type="text" validate error="wrong"
//             success="right"  />
//             <MDBInput label="Taxonomy Description" outline name="tax_description" value={this.state.description} onChange={this.handleChange} type="textarea" validate error="wrong"
//             success="right"  />
          
//         </div>
//         <div className="text-center">
//           <MDBBtn type="submit" value="Submit">Submit</MDBBtn>
//         </div>
//       </form>
//     </MDBCol>
//   </MDBRow>
// </MDBContainer>
//       </div>
//     );
//   }
// }



class Taxonomy extends React.Component{
constructor(){
super();
this.state={ taxoName:'', taxodescription:'' }
}
handleChange = event =>{
this.setState({ [event.target.name]:event.target.value })
}
handleSubmit = event =>{
event.preventDefault();
console.log("Taxo name : " + this.state.taxoName)
console.log("taxo description : " + this.state.taxodescription)
const url ="http://localhost:8080/api/taxonomies"
const data = { taxoName:this.state.taxoName, taxodescription:this.state.taxodescription }

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
<MDBInput  type="text" label="Taxonomy name" outline name="taxoName" onChange={this.handleChange} />
<MDBInput type="textarea" rows='5' label="Taxonomy Description" outline name="taxodescription" onChange={this.handleChange} />
<MDBBtn type="submit" value="Submit">Submit</MDBBtn></form>
</MDBCol>
  </MDBRow>
</MDBContainer> )
}
}


export default Taxonomy