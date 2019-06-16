import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../common/Loader";
import * as actionCreators from "../../redux/actions/actionCreators";

class OrderDetails extends Component {
  componentDidMount() {
    this.props.actions.fetchSingleOrder(
      Number(this.props.match.params.order_id)
    );
  }

  render() {
    return (
      <div className="container">
        {Object.keys(this.props.orderData).length < 1 ||
        this.props.isFetching ? (
          <Loader />
        ) : (
          <div className="row mt-5">
            {this.props.orderData.map(order => (
              <div key={order.product_id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Order information</h5>
                        <hr />
                        <p className="grey-text">
                          Order number {order.order_id}
                        </p>
                        <p className="grey-text">
                          Color: {order.attributes.split(",")[1]}
                        </p>
                        <p className="grey-text">
                          Quantity: {order.quantity}{" "}
                          {order.quantity > 1 ? "items" : "item"}
                        </p>
                        <p className="grey-text">
                          Size: {order.attributes.split(",")[0].toUpperCase()}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h5>Payment information</h5>
                        <hr />
                        <p className="grey-text">
                          Product: {order.product_name}
                        </p>
                        <p className="grey-text">Payment method: card</p>
                        <p className="grey-text">
                          Item amount: ${order.unit_cost}
                        </p>
                        <p className="grey-text">
                          Total amount: ${order.subtotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
)(OrderDetails);
