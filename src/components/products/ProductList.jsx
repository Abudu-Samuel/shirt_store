import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import ProductPagination from "./ProductPagination";

export default ({ products, handlePagination, pages, handleSingleProduct }) => {
  return (
    <div className="container">
      <div className="row loader">
        {Object.keys(products).length < 1 ? (
          <Loader />
        ) : (
            products.rows.map(product => (
              <div key={product.product_id} className="col-md-3 mb-3 mt-3">
                <Link to={`/products/${product.product_id}`}>
                  <div
                    className="card product-card"
                    onClick={() => handleSingleProduct(product.product_id)}
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
          )}
      </div>
      <div className="row">
        <div className="col-lg-12">
          {Object.keys(products).length < 1 ? null : (
            <ProductPagination
              handlePagination={handlePagination}
              pages={pages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
