import React, { Component } from "react";
import ReactDOM from "react-dom";


class SignInForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        values: {
          email: "",
          password: ""
        },
        isSubmitting: false,
        isError: false
      };
    }
  
    submitForm = async e => {
      e.preventDefault();
      console.log(this.state);
      this.setState({ isSubmitting: true });
  
      const res = await fetch("http://admin:VTG5DFZWI28J@localhost:8080/api/taxonomies", {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.setState({ isSubmitting: false });
      const data = await res.json();
      !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });
  
      setTimeout(
        () =>
          this.setState({
            isError: false,
            message: "",
            values: { email: "", password: "" }
          }),
        1600
      );
    };
  
    handleInputChange = e =>
      this.setState({
        values: { ...this.state.values, [e.target.name]: e.target.value }
      });
  
    render() {
      return (
        <div>
          <form onSubmit={this.submitForm}>
            <div className="input-group">
              <label htmlFor="email">E-mail Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.values.email}
                onChange={this.handleInputChange}
                title="Email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.values.password}
                onChange={this.handleInputChange}
                title="password"
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className={`message ${this.state.isError && "error"}`}>
            {this.state.isSubmitting ? "Submitting..." : this.state.message}
          </div>
        </div>
      );
    }
  }
  
  function App() {
    return (
      <div className="App">
        <h1>Sign In To Your Account</h1>
        <SignInForm />
      </div>
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);