import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../common/Loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import EmptySearchResult from "./EmptySearchResult";
import * as actionCreators from "../../redux/actions/actionCreators";

class ProductSearch extends Component {
  componentDidMount() {
    this.props.actions.searchProducts(this.props.match.params.query, 1);
  }

  componentWillUnmount() {
    this.props.actions.searchProducts("", 1);
  }

  handlePagination = page => {
    const nextPage = page.selected + 1;
    const { actions } = this.props;
    return actions.searchProducts(this.props.match.params.query, nextPage);
  };

  handleSingleProduct = id => {
    const productId = this.props.searchProducts.rows.filter(
      product => product.product_id === id
    );
    this.props.actions.fetchSingleProduct(productId[0].product_id);
  };

  render() {
    const { searchProducts } = this.props;
    return (
      <div className="container">
        <div className="row loader">
          {Object.keys(searchProducts).length < 1 || this.props.isFetching ? (
            <Loader />
          ) : searchProducts.rows.length > 0 || this.props.isFetching ? (
            searchProducts.rows.map(product => (
              <div key={product.product_id} className="col-md-3 mb-3 mt-3">
                <Link to={`/products/${product.product_id}`}>
                  <div
                    className="card product-card"
                    onClick={() => this.handleSingleProduct(product.product_id)}
                  >
                    <img
                      className="card-img-top img-fluid"
                      src={require(`../../assets/images/product_images/${
                        product.thumbnail
                      }`)}
                      alt=""
                    />

                    <div className="card-body">
                      <h6 className="text-center">
                        {product.name.length >= 20
                          ? product.name.slice(0, 17).concat("...")
                          : product.name}
                      </h6>
                      <span className="text-left" style={{ color: "#f7436b" }}>
                        <strike>${product.price}</strike>
                      </span>
                      <span style={{ float: "right", color: "#f7436b" }}>
                        ${product.discounted_price}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <EmptySearchResult query={this.props.match.params.query} />
          )}
        </div>
        {Object.keys(searchProducts).length < 1 ? null : (
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            onPageChange={this.handlePagination}
            pageCount={Math.ceil(this.props.pages / 4)}
            containerClassName="pagination pagination-sm custom-pagination"
            pageLinkClassName="page-link"
            nextLinkClassName="page-link next"
            previousLinkClassName="page-link previous"
            disabledClassName="disabled"
            pageClassName="page-item"
            previousClassName="page-item"
            nextClassName="page-item"
            activeClassName="active"
            subContainerClassName="pages pagination"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { searchProducts, isFetching, pages }
}) => ({
  searchProducts,
  isFetching,
  pages
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch);
