import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { validateSignIn } from "../utils/validator";
import FacebookAuth from "./FacebookAuth";
import * as actionCreators from "../../redux/actions/actionCreators";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {}
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const validation = validateSignIn(this.state).errors;

    if (Object.keys(validation).length > 0) {
      this.setState({
        errors: {
          validation
        }
      });

      return;
    } else {
      this.props.actions.loginRegisteredUser(this.state).then(() => {
        if (localStorage.getItem("accessToken")) {
          this.props.history.goBack();
        }
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <h4
                style={{ background: "#f7436b" }}
                className="card-header white-text text-center py-4"
              >
                <strong>Login</strong>
              </h4>
              <div className="card-body" style={{ padding: "2.7rem" }}>
                <div>
                  <div className="md-form">
                    <i className="fa fa-envelope prefix grey-text" />
                    <input
                      name="email"
                      onChange={this.handleChange}
                      type="email"
                      id="email"
                      className={
                        errors.validation && errors.validation.email
                          ? "error-input-field"
                          : "initial"
                      }
                    />
                    {errors.validation && (
                      <span className="field-error d-flex justify-content-end">
                        {errors.validation.email}
                      </span>
                    )}
                    <label className="font-weight-light label">
                      Your email
                    </label>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-lock prefix grey-text" />
                    <input
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                      id="materialFormCardPasswordEx"
                      className={
                        errors.validation && errors.validation.password
                          ? "error-input-field"
                          : "initial"
                      }
                    />
                    {errors.validation && (
                      <span className="field-error d-flex justify-content-end">
                        {errors.validation.password}
                      </span>
                    )}
                    <label className="font-weight-light label">
                      Your password
                    </label>
                  </div>
                  <div className="text-center mt-5">
                    <button
                      onClick={this.handleSubmit}
                      style={{
                        background: "#f7436b",
                        color: "#ffffff",
                        borderRadius: 25
                      }}
                      type="button"
                      className="btn btn-block z-depth-1a"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mt-3 pt-2">
                    {" "}
                    or Sign in with:
                  </p>
                  <FacebookAuth />
                  <div className="mt-5">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Not a member?{" "}
                      <Link
                        to="/register"
                        style={{ color: "#f7436b" }}
                        className=" ml-1"
                      >
                        {" "}
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
