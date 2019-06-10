import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { bindActionCreators } from "redux";
import cart from "../../assets/images/icons/bag/black.png";
import * as actionCreators from "../../redux/actions/actionCreators";

export class Navbar extends Component {
  state = {
    searchKeyWord: ""
  };

  componentDidMount() {
    const cart_id = localStorage.getItem("cartId");
    this.props.actions.getCartItems(cart_id);
    this.props.actions.sumCartTotal(cart_id);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.actions.searchProducts(this.state.searchKeyWord, 1);
  };

  handleLogOut = () => {
    this.props.actions.logOutAction();
    this.props.history.push("/");
  };

  render() {
    const decodeToken =
      localStorage.getItem("accessToken") &&
      jwt.decode(localStorage.getItem("accessToken").slice(7));
    return (
      <div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-4 col-lg-4 text-center">
              <div>
                Hi!
                {localStorage.getItem("accessToken") ? (
                  <h6 className="btn-group ml-2 mr-4">
                    <button
                      style={{
                        background: "#f7436b",
                        color: "#fff",
                        textTransform: "capitalize"
                      }}
                      className="btn btn-sm profile-button"
                    >
                      {decodeToken.name}
                    </button>
                    <button
                      className="btn btn-sm profile-button dropdown-toggle px-3"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                      <Link to="/cart">
                        <button className="dropdown-item grey-text btn btn-sm">
                          <i className="fas fa-shopping-bag mr-1" /> Cart
                        </button>
                      </Link>
                      <Link to="/profile">
                        <button className="dropdown-item grey-text btn btn-sm">
                          <i className="fas fa-user mr-1" /> Profile
                        </button>
                      </Link>
                      <button
                        onClick={this.handleLogOut}
                        className="dropdown-item grey-text btn btn-sm"
                      >
                        <i className="fas fa-sign-out-alt mr-1" /> Log out
                      </button>
                    </div>
                  </h6>
                ) : (
                  <h6 style={{ display: "inline-block" }}>
                    <Link className="ml-1 mr-1" to="/login">
                      <span style={{ color: "#f7436b", cursor: "pointer" }}>
                        Sign in
                      </span>
                    </Link>
                    or {""}
                    <Link to="/register">
                      <span style={{ color: "#f7436b", cursor: "pointer" }}>
                        Register
                      </span>
                    </Link>
                  </h6>
                )}
              </div>
            </div>
            <div className="col-md-4 col-lg-4 text-center">
              <h6>
                Daily Deals <span style={{ marginLeft: 15 }}>Sell</span>{" "}
                <span style={{ marginLeft: 15 }}>Help</span>
              </h6>
            </div>
            <div className="col-md-4 col-lg-4">
              <span>
                {" "}
                <Link to="/cart">
                  <div style={{ cursor: "pointer" }} className="tester">
                    <img src={cart} className="mb-1 img-merge" alt="" />
                    <button
                      className={
                        localStorage.getItem("accessToken")
                          ? "btn-circle btn-danger btn-sm btn-merge"
                          : "btn-circle btn-danger btn-sm btn-merge-two"
                      }
                      alt=""
                    >
                      {this.props.cart.length}
                    </button>
                  </div>
                </Link>
                <h6 className="text">
                  Your bag:
                  <span className="ml-1">
                    {this.props.cartTotal.total_amount === null
                      ? "$0.00"
                      : this.props.cartTotal.total_amount}
                  </span>
                </h6>
              </span>
            </div>
          </div>
        </div>

        <nav className="navbar container-fluid navbar-expand-lg navbar-light nav-color mb-4">
          <Link
            to="/"
            className="nav-space navbar-brand text-center"
            style={{ color: "#f7436b" }}
          >
            SHOP MATE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto item-space" />
            <div className="form-inline my-2 my-sm-1 search-space">
              <input
                className="form-control input-form mr-sm-1"
                type="search"
                name="searchKeyWord"
                placeholder="search anything"
                aria-label="Search"
                onChange={this.handleChange}
              />
              {this.state.searchKeyWord ? (
                <Link to={`/products/search/query=${this.state.searchKeyWord}`}>
                  <button
                    onClick={this.handleSubmit}
                    className="btn btn-sm form-control search-btn"
                  >
                    Search
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { products, category, pages, department, query, cartTotal, cart }
}) => ({
  products,
  category,
  pages,
  department,
  query,
  cartTotal,
  cart
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
