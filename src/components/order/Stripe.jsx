import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/actions/actionCreators";

class Checkout extends React.Component {
  state = {
    tax_id: 2,
    isPaymentSuccessful: false
  };

  handleCartOrder = () => {
    const cart_id = localStorage.getItem("cartId");
    const { shipping_region_id } = this.props.userData;
    const { tax_id } = this.state;
    const data = { cart_id, shipping_id: shipping_region_id, tax_id };

    this.props.actions.createOrderAction(data);
  };

  handleOrderPayment = token => {
    const order_id = Number(localStorage.getItem("orderId"));
    const description = "payment for order";
    const stripeToken = token.id;
    const amount = Number(this.props.cartTotal.total_amount * 100);

    const data = { stripeToken, order_id, description, amount };

    this.props.actions.createPaymentAction(data).then(() => {
      this.setState({
        isPaymentSuccessful: true
      });
    });
  };

  onToken = async token => {
    await this.handleCartOrder();
    await this.handleOrderPayment(token);
  };

  render() {
    return (
      <div>
        {this.state.isPaymentSuccessful ? (
          <Redirect to="/" />
        ) : (
          <StripeCheckout
            amount={Number(this.props.cartTotal.total_amount) * 100}
            image="https://www.jumia.com.ng/images/oshun/cart/empty-cart.png"
            locale="auto"
            name="Shop Mate"
            stripeKey="pk_test_NcwpaplBCuTL6I0THD44heRe"
            token={this.onToken}
          >
            <button
              style={{ background: "#f7436b", color: "#fff" }}
              className="btn btn-md btn-block mb-3"
            >
              pay with stripe
            </button>
          </StripeCheckout>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users: { userData }, products: { cartTotal } }) => ({
  userData,
  cartTotal
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
