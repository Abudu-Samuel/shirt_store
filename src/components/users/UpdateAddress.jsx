import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import Loader from "../common/Loader";
import AddressForm from '../common/AddressForm';
import { validateProfile } from '../utils/validator';
import * as actionCreators from "../../redux/actions/actionCreators";

const REGIONS = {
  1: 'select',
  2: 'US / Canada',
  3: 'Europe',
  4: 'Rest of World'
}

class UpdateAddress extends Component {
  state = {
    address: '',
    city: '',
    postalCode: '',
    country: '',
    shippingRegion: '',
    shipping_region_id: 1,
    errors: {}
  }

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
      [event.target.name]: event.target.value,
      errors: {}
    })
  }

  setRegion = event => {
    const inputValue = event.target.value;
    const regionValue = REGIONS[inputValue];
    this.setState({ shipping_region_id: Number(inputValue), shippingRegion: regionValue, errors: {} })
  }

  handleSubmit = () => {
    const { address, city, shippingRegion, postalCode, country, shipping_region_id } = this.state
    const data = { address_1: address, city, region: shippingRegion, postal_code: postalCode, country, shipping_region_id }

    const validation = validateProfile(this.state).errors;

    if (Object.keys(validation).length > 0) {
      this.setState({
        errors: {
          validation
        }
      });

      return;
    } else {
      this.props.actions.updateUserAddress(data)
        .then(() => {
          this.props.history.push('/profile')
        });
    }
  }

  render() {
    const { address, city, postalCode, country, shipping_region_id } = this.state
    return (
      <div>
        {
          this.props.isFetching ? (
            <Loader />
          ) :
            <div className="container">
              <div>
                <div className="mt-5 card user-card">
                  <div className="card-body">
                    <h5 className="card-title grey-text mb-3"><Link className="grey-text" to="/profile"><i className="fas fa-arrow-left mr-3"></i></Link> Edit Address</h5>
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
                    <button onClick={this.handleSubmit} style={{ background: '#f7436b', color: '#fff' }} className="btn btn-md btn-block mb-3">Save</button>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  users: { userData, isFetching }
}) => ({
  userData,
  isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);