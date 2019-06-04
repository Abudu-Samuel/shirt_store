/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/actions/actionCreators";

class FacebookAuth extends Component {
  state = {
    showFacebookLoginWithCallback: false,
    isLoggedIn: false
  };

  responseFacebook = response => {
    this.props.actions
      .facebookAuthentication({
        access_token: response.accessToken
      })
      .then(() => {
        if (localStorage.getItem("accessToken")) {
          this.setState({
            isLoggedIn: true
          });
        }
      });
  };

  componentClicked = () => {
    console.log("was clicked");
  };

  redirect = () => {
    this.setState({
      showFacebookLoginWithCallback: true
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <div>
            <FacebookLogin
              appId="352854622106208"
              fields="name,email,picture"
              callback={response => this.responseFacebook(response)}
              render={renderProps => (
                <button
                  style={{
                    borderRadius: 25,
                    background: "#3b5998",
                    color: "#ffffff"
                  }}
                  className="btn btn-block mr-md-3 z-depth-1a"
                  onClick={renderProps.onClick}
                >
                  Facebook
                </button>
              )}
            />
          </div>
        )}{" "}
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
)(FacebookAuth);
