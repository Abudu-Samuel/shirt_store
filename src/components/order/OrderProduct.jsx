import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddressForm from "../common/AddressForm";
import Stripe from "./Stripe";
import Loader from "../common/Loader";
import * as actionCreators from "../../redux/actions/actionCreators";

const REGIONS = {
  1: "select",
  2: "US / Canada",
  3: "Europe",
  4: "Rest of World"
};

class OrderProduct extends Component {
  state = {
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shippingRegion: "",
    shipping_region_id: 1,
    errors: {}
  };

  componentDidMount() {
    this.props.actions.getUserInformation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userData !== this.props.userData) {
      this.setState({
        address: this.props.userData.address_1,
        city: this.props.userData.city,
        postalCode: this.props.userData.postal_code,
        country: this.props.userData.country,
        shippingRegion: this.props.userData.region,
        shipping_region_id: this.props.userData.shipping_region_id
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setRegion = event => {
    const inputValue = event.target.value;
    const regionValue = REGIONS[inputValue];
    this.setState({
      shipping_region_id: Number(inputValue),
      shippingRegion: regionValue
    });
  };

  render() {
    const {
      address,
      city,
      postalCode,
      country,
      shipping_region_id
    } = this.state;
    return (
      <div>
        {this.props.isFetching ? (
          <Loader />
        ) : (
          <div className="container mt-5">
            <div className="card user-card">
              <div className="card-body">
                <h5 className="card-title text-center grey-text mb-3">
                  <Link className="grey-text" to="/cart">
                    <i
                      style={{ float: "left" }}
                      className="fas fa-arrow-left mr-3"
                    />
                  </Link>{" "}
                  Shipping Address
                </h5>
                <AddressForm
                  address={address}
                  city={city}
                  postalCode={postalCode}
                  country={country}
                  shipping_region_id={shipping_region_id}
                  handleChange={this.handleChange}
                  setRegion={this.setRegion}
                  state={this.state.errors}
                />
                <Stripe />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users: { userData, isFetching } }) => ({
  userData,
  isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderProduct);
