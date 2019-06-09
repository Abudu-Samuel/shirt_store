import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions/actionCreators";

class Cart extends Component {
  state = {
    tax_id: 2
  };

  componentDidMount() {
    const cart_id = localStorage.getItem("cartId");
    this.props.actions.getCartItems(cart_id);
  }

  removeItemInCart = item_id => {
    this.props.actions.removeItem(item_id);
  };

  handleQuantity = async (value, itemId) => {
    const cartItem = this.props.cart.find(item => item.item_id === itemId);
    const { item_id, quantity } = cartItem;
    let newQuantity;

    if (value === "+") {
      newQuantity = quantity + 1;
    } else if (value === "-") {
      newQuantity = quantity - 1;
    }
    await this.props.actions.updateQuantityAction(item_id, newQuantity);
  };

  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <Loader />
        ) : (
          <div className="container mt-5">
            {this.props.cart.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://www.jumia.com.ng/images/oshun/cart/empty-cart.png"
                  alt=""
                  className="mb-4"
                />

                <h5 className="grey-text mb-4">Your cart is empty!</h5>
                <h5 className="mb-5">
                  Browse our categories and discover our best deals!
                </h5>
                <Link to="/">
                  <button className="btn btn-md btn-info">
                    Start shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="container body">
                <div className="container-fluid">
                  <h4 className="pt-4 pb-2 text-center item-cart">
                    {this.props.cart.length} items in your cart
                  </h4>
                </div>
                <div className="container">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Size</th>
                          <th scope="col" className="quantity">
                            Quantity
                          </th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.cart.map(item => (
                          <tr key={item.product_id}>
                            <th scope="row" className="cart-table">
                              <img
                                className="img img-fluid z-depth-3"
                                src={require(`../../assets/images/product_images/${
                                  item.image
                                }`)}
                                alt=""
                              />
                              <div>
                                <p className="ml-5">{item.name}</p>
                                <p
                                  onClick={() =>
                                    this.removeItemInCart(item.item_id)
                                  }
                                  style={{ cursor: "pointer" }}
                                  className="ml-5"
                                >
                                  <i className="fas fa-times mr-2 red-text" />
                                  Remove
                                </p>
                              </div>
                            </th>
                            <td>{item.attributes.toUpperCase()}</td>
                            <td>
                              <div className="mb-3">
                                <button
                                  style={{ background: "#EFEFEF" }}
                                  className="btn btn-md mr-1"
                                  alt=""
                                  onClick={() =>
                                    this.handleQuantity("-", item.item_id)
                                  }
                                >
                                  -
                                </button>
                                <button
                                  style={{
                                    background: "#ffffff",
                                    cursor: "default"
                                  }}
                                  className="btn btn-md mr-1"
                                  name="quantity"
                                  onChange={this.handleChange}
                                >
                                  {item.quantity}
                                </button>
                                <button
                                  style={{ background: "#EFEFEF" }}
                                  className="btn btn-md"
                                  alt=""
                                  onClick={() =>
                                    this.handleQuantity("+", item.item_id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>${item.subtotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="container">
                  <Link to="/">
                    <button
                      style={{ color: "#f7436b", borderRadius: 15 }}
                      className="btn mb-4 btn-sm"
                    >
                      shop
                    </button>
                  </Link>
                  {Object.keys(this.props.userData).length > 0 ? (
                    <Link to="/order">
                      <button
                        className="btn btn-sm"
                        style={{
                          borderRadius: 15,
                          float: "right",
                          background: "#f7436b",
                          color: "#fff"
                        }}
                      >
                        checkout
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <button
                        className="btn btn-sm"
                        style={{
                          borderRadius: 15,
                          float: "right",
                          background: "#f7436b",
                          color: "#fff"
                        }}
                      >
                        Login to proceed to checkout
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { cart, isFetching, updateQuantity },
  users: { userData }
}) => ({
  cart,
  isFetching,
  updateQuantity,
  userData
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
