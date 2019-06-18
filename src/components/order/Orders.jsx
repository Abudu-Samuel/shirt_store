import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Loader from "../common/Loader";
import * as actionCreators from "../../redux/actions/actionCreators";

class Orders extends Component {
  state = {
    paginatedNumbers: {},
    totalPages: 0,
    currentPage: 1,
    orderPerPage: 12,
    orderData: [],
    isLoading: true
  };

  componentDidMount() {
    this.props.actions.fetchAllOrders().then(() => {
      const { currentPage } = this.state;
      const paginatedNumbers = this.getOrders(
        this.props.orderData,
        this.state.currentPage,
        12
      );
      const { totalPages } = paginatedNumbers;
      this.setState({
        paginatedNumbers,
        totalPages,
        orderData: this.props.orderData,
        currentPage
      });
    });
  }

  handleSingleOrder = id => {
    const orderId = this.props.orderData.filter(order => order.order_id === id);
    this.props.actions.fetchSingleOrder(orderId[0].order_id);
  };

  getOrders = (orders, page, displayPerPage) => {
    const offset = (page - 1) * displayPerPage;

    const paginatedNumbers = orders.slice(offset).slice(0, displayPerPage);
    const totalPages = Math.ceil(orders.length / displayPerPage);

    const items = {
      page,
      displayPerPage,
      totalPages,
      nextPage: totalPages > page ? page + 1 : null,
      previousPage: page - 1 ? page - 1 : null,
      total: orders.length,
      orderData: paginatedNumbers
    };

    return items;
  };

  handlePagination = page => {
    const { selected } = page;
    const { orderData } = this.state;
    const currentPage = Math.ceil(selected) + 1;
    const paginatedNumbers = this.getOrders(orderData, currentPage, 12);
    const { totalPages } = paginatedNumbers;
    this.setState({
      paginatedNumbers,
      totalPages,
      orderData: this.props.orderData,
      currentPage,
      isLoading: false
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.orderData.length < 1 || this.props.isFetching ? (
          <Loader />
        ) : (
          <div className=" mt-5">
            {this.state.orderData.length === undefined ||
            this.props.isFetching ? (
              <Loader />
            ) : (
              <div className="row">
                {this.state.paginatedNumbers.orderData.map(order => (
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
                <div className="col-md-12">
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    onPageChange={this.handlePagination}
                    pageCount={this.state.paginatedNumbers.totalPages}
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
                </div>
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
