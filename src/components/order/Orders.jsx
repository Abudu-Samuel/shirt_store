import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Loader from "../common/Loader";
import * as actionCreators from "../../redux/actions/actionCreators";

class Orders extends Component {
  componentDidMount() {
    this.props.actions.fetchAllOrders();
  }

  handleSingleOrder = id => {
    const orderId = this.props.orderData.filter(order => order.order_id === id);
    this.props.actions.fetchSingleOrder(orderId[0].order_id);
  };

  render() {
    console.log(this.props.orderData.length);
    return (
      <div className="container">
        {this.props.orderData.length < 1 || this.props.isFetching ? (
          <Loader />
        ) : (
          <div className=" mt-5">
            {this.props.orderData.length === undefined ? (
              <Loader />
            ) : (
              <div className="row">
                {this.props.orderData.map(order => (
                  <div key={order.order_id} className="col-md-3 mb-3">
                    <Link to={`/orders/${order.order_id}`}>
                      <div
                        onClick={() => this.handleSingleOrder(order.order_id)}
                        style={{ cursor: "pointer" }}
                        className="card"
                      >
                        <div className="card-body">
                          {order.created_on === undefined ? (
                            ""
                          ) : (
                            <div>
                              <p>
                                {" "}
                                <i className="fas fa-check-circle green-text" />{" "}
                                Ordered on {order.created_on.slice(0, 10)}
                              </p>
                              <p className="text-center">
                                Click to see details
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ orders: { orderData, isFetching } }) => ({
  orderData,
  isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
