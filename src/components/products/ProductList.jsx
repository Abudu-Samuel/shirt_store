import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import ProductPagination from "./ProductPagination";

export default ({
  products,
  handlePagination,
  pages,
  isFetching,
  handleSingleProduct,
  handleProductCategories,
  catInDept
}) => {
  return (
    <div className="container">
      <div className="">
        {Object.keys(products).length < 1 || isFetching ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-md-2 mt-3">
              <h4>Categories</h4>
              <hr />
              {Object.keys(catInDept).length < 1 ? (
                <div>
                  <p
                    onClick={() => handleProductCategories(1)}
                    className="mt-4 category"
                  >
                    French
                  </p>
                  <p
                    onClick={() => handleProductCategories(2)}
                    className="category"
                  >
                    Italian
                  </p>
                  <p
                    onClick={() => handleProductCategories(3)}
                    className="category"
                  >
                    Irish
                  </p>
                  <p
                    onClick={() => handleProductCategories(4)}
                    className="category"
                  >
                    Animal
                  </p>
                  <p
                    onClick={() => handleProductCategories(5)}
                    className="category"
                  >
                    Flower
                  </p>
                  <p
                    onClick={() => handleProductCategories(6)}
                    className="category"
                  >
                    Christmas
                  </p>
                  <p
                    onClick={() => handleProductCategories(7)}
                    className="category"
                  >
                    Valentine's
                  </p>
                </div>
              ) : (
                <div>
                  {catInDept.map(category => (
                    <div>
                      <p
                        onClick={() =>
                          handleProductCategories(category.category_id)
                        }
                        className="mt-4 category"
                      >
                        {category.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-10">
              <div className="row">
                {products.rows.map(product => (
                  <div key={product.product_id} className="col-md-4 mb-3 mt-3">
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
                          {product.discounted_price === "0.00" ? (
                            <span
                              className="d-flex justify-content-center"
                              style={{ color: "#f7436b" }}
                            >
                              {product.price}
                            </span>
                          ) : (
                            <div>
                              <span
                                className="text-left"
                                style={{ color: "#f7436b" }}
                              >
                                <strike>${product.price}</strike>
                              </span>
                              <span
                                style={{ float: "right", color: "#f7436b" }}
                              >
                                ${product.discounted_price}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
