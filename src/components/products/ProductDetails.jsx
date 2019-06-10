import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Loader from "../common/Loader";
import QuantityButton from "../common/QuantityButton";
import * as actionCreators from "../../redux/actions/actionCreators";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      quantity: 1,
      thumbnail: "",
      cart_id: "",
      product_id: "",
      attributes: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.product_id !== this.props.product.product_id) {
      this.setState({
        product_id: this.props.product.product_id,
        thumbnail: this.props.product.thumbnail
      });
    }
  }

  async componentDidMount() {
    this.props.actions.fetchSingleProduct(
      Number(this.props.match.params.product_id)
    );

    if (!localStorage.getItem("cartId")) {
      await this.props.actions.getCartId();
      this.setState({ cart_id: this.props.cartId.cart_id });
      localStorage.setItem("cartId", this.props.cartId.cart_id);
    } else {
      const cartID = localStorage.getItem("cartId");
      this.setState({ cart_id: cartID });
    }
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.value]: event.target.name
    });
  };

  handleSize = size => {
    if (size === "xs") {
      this.setState({
        attributes: "xs"
      });
    }
    if (size === "s") {
      this.setState({
        attributes: "s"
      });
    }
    if (size === "m") {
      this.setState({
        attributes: "m"
      });
    }
    if (size === "l") {
      this.setState({
        attributes: "l"
      });
    }
    if (size === "xl") {
      this.setState({
        attributes: "xl"
      });
    }
    if (size === "xxl") {
      this.setState({
        attributes: "xxl"
      });
    }
  };

  changeImage = img => {
    this.setState({ thumbnail: img });
  };

  handleQuantity = arth => {
    if (arth === "+") {
      this.setState({
        quantity: this.state.quantity + 1
      });
    }

    if (arth === "-") {
      this.setState({
        quantity: this.state.quantity === 1 ? 1 : this.state.quantity - 1
      });
    }
  };

  addProductToCart = () => {
    const { cart_id, product_id, attributes } = this.state;
    const data = { cart_id, product_id, attributes };
    this.props.actions.addToCartAction(data, this.state.quantity);
  };

  render() {
    const { name, price, image, image_2, description } = this.props.product;

    return (
      <div className="container body">
        <div className="">
          {Object.keys(this.props.product).length < 1 ? (
            <Loader />
          ) : (
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-4 mt-5 mb-5">
                {this.state.thumbnail && (
                  <img
                    className="card-img-top img-fluid z-depth-3 mb-4"
                    src={require(`../../assets/images/product_images/${
                      this.state.thumbnail
                    }`)}
                    alt=""
                  />
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    className="img-dt img-fluid z-depth-3 mr-4"
                    src={require(`../../assets/images/product_images/${image}`)}
                    onClick={() => this.changeImage(image)}
                    alt=""
                  />
                  <img
                    className="img-dt img-fluid z-depth-3"
                    src={require(`../../assets/images/product_images/${image_2}`)}
                    onClick={() => this.changeImage(image_2)}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-6 offset-md-1 mt-5 mb-5">
                <p className="grey-text">
                  Home . All Categories . Men's clothings and accessories
                </p>
                <div>
                  <StarRatings
                    rating={2.403}
                    starRatedColor="gold"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h3 className="mt-1">{name}</h3>
                <h6 className="mt-1">{description}</h6>
                <h4 style={{ color: "#f7436b" }}>${price}</h4>
                <h6 className="grey-text mt-3 mb-3">Color</h6>
                <div className="mb-3">
                  <button
                    style={{ background: "#6EB2FB" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#00D3CA" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#F62F5E" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#FE5C07" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#F8E71C" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#7ED321" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                  <button
                    style={{ background: "#9013FE" }}
                    className="btn-circle hov btn-sm mr-3"
                    alt=""
                  />
                </div>
                <h6 className="grey-text mt-3 mb-3">Size</h6>
                <div className="mb-3">
                  <button
                    style={{
                      background:
                        this.state.attributes === "xs" ? "#f7436b" : "#EFEFEF",
                      color:
                        this.state.attributes === "xs" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3 mb-2"
                    alt=""
                    onClick={() => this.handleSize("xs")}
                  >
                    XS
                  </button>
                  <button
                    style={{
                      background:
                        this.state.attributes === "s" ? "#f7436b" : "#EFEFEF",
                      color: this.state.attributes === "s" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3"
                    alt=""
                    onClick={() => this.handleSize("s")}
                  >
                    S
                  </button>
                  <button
                    style={{
                      background:
                        this.state.attributes === "m" ? "#f7436b" : "#EFEFEF",
                      color: this.state.attributes === "m" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3"
                    alt=""
                    onClick={() => this.handleSize("m")}
                  >
                    M
                  </button>
                  <button
                    style={{
                      background:
                        this.state.attributes === "l" ? "#f7436b" : "#EFEFEF",
                      color: this.state.attributes === "l" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3"
                    alt=""
                    onClick={() => this.handleSize("l")}
                  >
                    L
                  </button>
                  <button
                    style={{
                      background:
                        this.state.attributes === "xl" ? "#f7436b" : "#EFEFEF",
                      color:
                        this.state.attributes === "xl" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3"
                    alt=""
                    onClick={() => this.handleSize("xl")}
                  >
                    XL
                  </button>
                  <button
                    style={{
                      background:
                        this.state.attributes === "xxl" ? "#f7436b" : "#EFEFEF",
                      color:
                        this.state.attributes === "xxl" ? "#fff" : "#000000",
                      height: 30,
                      width: 62
                    }}
                    className="btn-sm mr-3"
                    alt=""
                    onClick={() => this.handleSize("xxl")}
                  >
                    XXL
                  </button>
                </div>
                <h6 className="grey-text mt-3 mb-3">Quantity</h6>
                <QuantityButton
                  handleQuantity={this.handleQuantity}
                  handleChange={this.handleChange}
                  quantity={this.state.quantity}
                />
                <button
                  style={{
                    background: "#f7436b",
                    color: "#ffffff",
                    borderRadius: 50
                  }}
                  className="btn btn-large btn-round"
                  onClick={this.addProductToCart}
                  data-toggle="modal"
                  data-target="#modalAbandonedCart"
                >
                  Add to cart
                </button>

                {/* start */}
                <div
                  className="modal fade right"
                  id="modalAbandonedCart"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                  data-backdrop="false"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-notify modal-info"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <p className="heading">Product in the cart</p>

                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true" className="white-text">
                            &times;
                          </span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-3">
                            <p />
                            <p className="text-center">
                              <i className="fas fa-shopping-cart fa-4x" />
                            </p>
                          </div>

                          <div className="col-md-9">
                            <p>
                              Do you need more time to make a purchase decision?
                            </p>
                            <p>
                              No pressure, your product will be waiting for you
                              in the cart.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer justify-content-center">
                        <Link to="/cart">
                          <button className="btn btn-md btn-info">
                            Go to cart
                          </button>
                        </Link>
                        <Link to="/">
                          <button className="btn btn-md btn-outline-info waves-effect">
                            continue shopping
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end */}
              </div>
              <div className="col-md-1" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { product, cartId, cart, updateQuantity }
}) => ({
  product,
  cartId,
  cart,
  updateQuantity
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
