import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { MDBInput, MDBContainer, MDBCol,MDBRow, MDBSelect, MDBBtn } from 'mdbreact';

class Learningobjective extends Component {

    constructor () {
      super();
      this.state={leveloptions:[] , verbOptions:[] , taxoOptions:[] , domainOptions:[] , fieldOptions:[] , subjectOptions:[] , topicOptions:[] , lob_data:''}
      this.taxonomy_data = React.createRef();
      this.level_data = React.createRef();
      this.domain_data = React.createRef();
      this.field_data= React.createRef();
      this.subject_data = React.createRef();
      
    }
    componentDidMount (){
      this.fetchtaxonomies();
      this.fetchdomains();
    }
    fetchtaxonomies (){
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
      });
    }
    fetchdomains(){

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
    handleSubmit = event => {
      event.preventDefault();
      console.log(this.taxonomy_data.current);
      console.log(this.state.lob_data)
    };
    handleInputChange = event =>{
      this.setState({ [event.target.name]:event.target.value })
      }
    handlelevelfetch = event => {
      let initiallevel = [];
        const url =`http://localhost:8080/api/levels/taxonomies/${this.taxonomy_data.current.value}`
        fetch(url, { method: 'GET', // or ‘PUT’ // data can be `string` or {object}!
        headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          initiallevel = response.map(level => {
            return level
            });
            console.log(initiallevel);
            this.setState({
                leveloptions: initiallevel,
            });
        });
    }
    handleverbfetch = event => {
      let initialverb = [];
        const url =`http://localhost:8080/api/verbs/levels/${this.level_data.current.value}`
        fetch(url, { method: 'GET', // or ‘PUT’ // data can be `string` or {object}!
        headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if(response.length > 0 ) {  
            initialverb = response.map(verb => {
              return verb
              });
              console.log(initialverb);
              this.setState({
                  verbOptions: initialverb,
              });
          }
        });
    }
    handlefieldfetch = event => {
      let initialfield = [];
        const url =`http://localhost:8080/api/fields/domains/${this.domain_data.current.value}`
        fetch(url, { method: 'GET', // or ‘PUT’ // data can be `string` or {object}!
        headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"} })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if(response.length > 0 ) {  
            initialfield = response.map(field => {
              return field
              });
              console.log(initialfield);
              this.setState({
                  fieldOptions: initialfield,
              });
          }
        });
    }
    handlesubjectfetch = event => {
      let initialSubject = [];
  fetch(`http://localhost:8080/api/subjects/fields/${this.field_data.current.value}`, {
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
  handletopicfetch = event => {
    let initialTopic = [];
  fetch(`http://localhost:8080/api/topics/subjects/${this.subject_data.current.value}`, {
    headers:{ 'Content-Type': 'application/json' ,"Authorization": "Basic YWRtaW46VlRHNURGWldJMjhK"}
  }
  )
      .then(response => {
          return response.json();
      }).then(data => {
        console.log(data)
        initialTopic = data.map(topic => {
          return topic
      });
      console.log(initialTopic);
      this.setState({
          topicOptions: initialTopic,
      });
      // console.log(this.setState.taxoOptions)
  });
  }
      render() {
        let optionlevels;
        let optionverbs;
        if(this.state.leveloptions.length > 0 ){
        optionlevels = this.state.leveloptions.map((levels) =>
                <option value={levels.levelId} key={levels.levelId}>{levels.levelName}</option>
            );}
            else { 
              optionlevels =  <option value="NaN" key="NaN">No Data available</option>
            }
            if(this.state.verbOptions.length > 0 ){

            optionverbs = this.state.verbOptions.map((verbs) =>
                <option value={verbs.verbId} key={verbs.verbId}>{verbs.verbName}</option>
            );
            }
            else { 
              optionverbs =  <option value="NaN" key="NaN">No Data available</option>
            }
            let optiontaxos = this.state.taxoOptions.map((taxos) =>
                <option value={taxos.taxoId} key={taxos.taxoId}>{taxos.taxoName}</option>
            );
            let optiondomains = this.state.domainOptions.map((domains) =>
                <option value={domains.domainId} key={domains.domainId}>{domains.domainName}</option>
            );
            let optionfields = this.state.fieldOptions.map((fields) =>
          <option value={fields.fieldId} key={fields.fieldId}>{fields.fieldName}</option>
          );
          let optionsubjects = this.state.subjectOptions.map((subjects) =>
          <option value={subjects.subjectId} key={subjects.subjectId}>{subjects.subjectName}</option>
          );
          let optiontopics = this.state.topicOptions.map((topics) =>
          <option value={topics.topicId} key={topics.topicId}>{topics.topicName}</option>
          );
    return (
        
        <MDBContainer>
            <form onSubmit={this.handleSubmit}>
            <i class="fas fa-pencil-alt prefix">   Learning Objective</i>
            <MDBInput type="textarea" label="Write Learning Objective" name="lob_data" rows="2" size="sm" onChange={this.handleInputChange} />

      <MDBRow>
      <MDBCol size="1"></MDBCol>
        <MDBCol size="4">
        <select className="browser-default custom-select" ref={this.taxonomy_data} onChange={this.handlelevelfetch}>
          <option>Taxonomy</option>
          {optiontaxos}
        </select>
        <br/>
        <br/>

        
        <select className="browser-default custom-select" ref={this.level_data} onChange={this.handleverbfetch}>
          <option>Level</option>

          { optionlevels}
        </select>
        <br/>
        <br/>


        <select className="browser-default custom-select" >
          <option>Verb</option>
          {optionverbs}
        </select>
        </MDBCol>

        <MDBCol size="2"></MDBCol>

        <MDBCol size="4">
        <select className="browser-default custom-select" ref={this.domain_data} onChange={this.handlefieldfetch}>
          <option>Domain</option>
          {optiondomains}
        </select>
        <br/>
        <br/>

        
        <select className="browser-default custom-select" ref={this.field_data} onChange={this.handlesubjectfetch}>
          <option>Field</option>
         {optionfields}
        </select>
        <br/>
        <br/>


        <select className="browser-default custom-select" ref={this.subject_data} onChange={this.handletopicfetch}>
          <option>Subject</option>
          {optionsubjects}
        </select>
        <br/>
        <br/>


        <select className="browser-default custom-select">
        <option>Topic</option>
          {optiontopics}
        </select>

        </MDBCol>

      </MDBRow>
      <MDBBtn type="submit" value="Submit">Submit</MDBBtn></form>
    </MDBContainer>
    
    )
      }
}

export default Learningobjective;