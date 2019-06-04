import React from "react";
import ReactCardFlip from "react-card-flip";

export default ({
  isFlipped,
  handleCardFlip,
  handleProductCategories,
  handleProductDepartments
}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className="card front-card mb-2" key="front">
            <div className="card-body text-center">
              <h4 className="text-size">Categories.</h4>
            </div>
          </div>
          <div className="card mb-2" key="back">
            <div className="row mb-2 mt-2">
              <div className="col-md-12">
                {" "}
                <button
                  onClick={() => handleProductCategories(1)}
                  className="btn btn-sm btn-outline-default btn-dep"
                >
                  French
                </button>
                <button
                  onClick={() => handleProductCategories(2)}
                  className="btn btn-sm btn-outline-secondary btn-dep"
                >
                  Italian
                </button>
                <button
                  onClick={() => handleProductCategories(4)}
                  className="btn btn-sm btn-outline-info btn-dep"
                >
                  Animal
                </button>
                <button
                  onClick={() => handleProductCategories(3)}
                  className="btn btn-sm btn-outline-warning btn-dep"
                >
                  Irish
                </button>
                <button
                  onClick={() => handleProductCategories(5)}
                  className="btn btn-sm btn-outline-danger btn-dep"
                >
                  Flower
                </button>
                <button
                  onClick={() => handleProductCategories(6)}
                  className="btn btn-sm btn-outline-success btn-dep"
                >
                  Christmas
                </button>
                <button
                  onClick={() => handleProductCategories(7)}
                  className="btn btn-sm btn-outline-primary btn-dep"
                >
                  Valentine's
                </button>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </div>

      <div className="col-md-6">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className="card front-card" key="front">
            <div className="card-body text-center">
              <h4 className="text-size">Departments.</h4>
            </div>
          </div>

          <div className="card" key="back">
            <div className="row mb-2 mt-2">
              <div className="col-md-12">
                {" "}
                <button
                  className="btn btn-sm btn-outline-default btn-dep"
                  disabled
                >
                  Autum
                </button>
                <button
                  onClick={() => handleProductDepartments(2)}
                  className="btn btn-sm btn-outline-secondary btn-dep"
                >
                  Nature
                </button>
                <button
                  className="btn btn-sm btn-outline-warning btn-dep"
                  disabled
                >
                  Rainy
                </button>
                <button
                  onClick={() => handleProductDepartments(3)}
                  className="btn btn-sm btn-outline-danger btn-dep"
                >
                  Seasonal
                </button>
                <button
                  className="btn btn-sm btn-outline-info btn-dep"
                  disabled
                >
                  Winter
                </button>
                <button
                  className="btn btn-sm btn-outline-success btn-dep"
                  disabled
                >
                  Sectional
                </button>
                <button
                  onClick={() => handleProductDepartments(1)}
                  className="btn btn-sm btn-outline-primary btn-dep"
                >
                  Regional
                </button>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </div>
    </div>

    <div className="col-10 col-md-4 mx-auto">
      <button
        className="btn btn-sm btn-outline-primary btn-dep"
        onClick={handleCardFlip}
      >
        view categories and departments
      </button>
    </div>
  </div>
);
