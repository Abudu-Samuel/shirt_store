import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/actions/actionCreators";
import Carousel from "../common/Carousel";
import sliderOne from "../../assets/images/icons/bag/slide-ex.jpg";
import sliderTwo from "../../assets/images/icons/bag/slide-ez.jpg";
import sliderThree from "../../assets/images/icons/bag/men.jpg";
import ProductList from "./ProductList";

export class Products extends Component {
  state = {
    id: ""
  };

  componentDidMount() {
    this.props.actions.fetchAllProducts(1);
  }

  handlePagination = page => {
    const nextPage = page.selected + 1;
    const { category, actions, department } = this.props;
    if (category) {
      return actions.fetchProductCategory(category, nextPage);
    } else if (department) {
      return actions.fetchProductDepartment(department, nextPage);
    }
    return actions.fetchAllProducts(nextPage);
  };

  handleCardFlip = event => {
    event.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  handleProductCategories = id => {
    this.props.actions.fetchProductCategory(id, 1);
  };

  handleProductDepartments = id => {
    this.props.actions.fetchProductDepartment(id, 1);
  };

  handleSingleProduct = id => {
    const productId = this.props.products.rows.filter(
      product => product.product_id === id
    );
    this.props.actions.fetchSingleProduct(productId[0].product_id);
  };

  render() {
    const { products, pages, isFetching, catInDept } = this.props;
    const slides = [
      <img className="img-fluid slide-img" src={sliderTwo} alt="1" />,
      <img className="img-fluid slide-img" src={sliderOne} alt="2" />,
      <img className="img-fluid slide-img" src={sliderThree} alt="3" />
    ];
    return (
      <div>
        <Carousel className="container" slides={slides} />

        <h4 className="text-center">Departments</h4>
        <hr />
        <p
          style={{ cursor: "pointer", color: "#f7436b" }}
          className="text-center"
        >
          <span
            onClick={() => this.handleProductDepartments(1)}
            className="mr-4"
          >
            Regional
          </span>{" "}
          <span
            onClick={() => this.handleProductDepartments(2)}
            className="mr-4"
          >
            Nature
          </span>
          <span onClick={() => this.handleProductDepartments(3)}>Seasonal</span>
        </p>
        <ProductList
          products={products}
          handlePagination={this.handlePagination}
          pages={pages}
          isFetching={isFetching}
          handleSingleProduct={this.handleSingleProduct}
          handleProductCategories={this.handleProductCategories}
          catInDept={catInDept}
          id={this.state.id}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { products, category, pages, department, isFetching, catInDept }
}) => ({
  products,
  category,
  pages,
  department,
  isFetching,
  catInDept
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
