import React, { Component } from "react";
import { signup } from "../../utils/Requests";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import { handleRecaptcha } from "../../utils/helpers";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
      recaptcha: false
    };
  }

  handleChange = event => {
    this.setState({ error: "", open: false });
    this.setState({ [event.target.name]: event.target.value });
  };

  recaptchaHandler = e => {
    let recaptcha = handleRecaptcha(e);
    this.setState({ recaptcha });
  };

  clickSubmit = async event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };

    if (this.state.recaptcha) {
      const data = await signup(user);
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    } else {
      this.setState({
        error: "What day is today? Please write a correct answer!"
      });
    }
  };

  render() {
    const { error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {open && (
          <div className="alert alert-success">
            Successfully created account. Please{" "}
            <Link to="/signin">Sign In</Link>
          </div>
        )}
        <SignupForm
          stateValues={this.state}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
          recaptchaHandler={this.recaptchaHandler}
        />
      </div>
    );
  }
}

export default Signup;
