import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/actions/actionCreators";

class UserProfile extends Component {

  componentDidMount() {
    this.props.actions.getUserInformation()
  }

  render() {
    const { name, address_1, email, city, country } = this.props.userData
    return (
      <div>
        {
          this.props.isFetching ? (
            <Loader />
          ) : (
              <div className="container">
                <div className="mt-5">
                  <div className="card user-card">
                    <div className="card-body">
                      <h5 className="card-title grey-text mb-3">Account Overview</h5>
                      <div className="row">
                        <div className="col-md-6 mb-5">
                          <div className="card">
                            <div className="card-body">
                              <h6 className="grey-text">Account Details <i style={{ float: 'right' }} className="fas fa-user" /></h6>
                              <hr />
                              <h5 className="grey-text text-capitalize">{name}</h5>
                              <h6 className="grey-text">{email}</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-5">
                          <div style={{
                            minHeight: 149,
                            maxHeight: 149
                          }} className="card">
                            <div className="card-body">
                              <h6 className="grey-text">Address Book <Link className="grey-text" to="/edit_address"><i style={{ float: 'right' }} className="fas fa-pen" /></Link></h6>
                              <hr />
                              {
                                address_1 === null ? <h6 className="grey-text">Hi <span className="text-capitalize">{name}</span>, kindly update your address by clicking on the pen icon!</h6>
                                  :
                                  <div>
                                    <h6 className="grey-text">{address_1}.</h6>
                                    <h6 className="grey-text">{city}, {' '} {country}.</h6>
                                  </div>
                              }
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-5">
                          <div
                            style={{
                              minHeight: 149,
                              maxHeight: 149
                            }}
                            className="card">
                            <div className="card-body">
                              <h6 className="grey-text">Newsletter Preferences <i style={{ float: 'right' }} className="fas fa-newspaper" /></h6>
                              <hr />
                              <h6 className="grey-text">You are currently not subscribed to newsletters</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-5">
                          <div
                            style={{
                              minHeight: 149,
                              maxHeight: 149
                            }}
                            className="card">
                            <div className="card-body">
                              <h6 className="grey-text">Pending Reviews <i style={{ float: 'right' }} className="fas fa-star" /></h6>
                              <hr />
                              <h6 className="grey-text">You have no pending reviews</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);