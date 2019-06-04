import React from 'react';

export default ({ handleQuantity, handleChange, quantity }) => (
  <div className="mb-3">
    <button
      style={{ background: "#EFEFEF" }}
      className="btn btn-md mr-1"
      alt=""
      onClick={() => handleQuantity("-")}
    >
      -
    </button>
    <button
      style={{ background: "#ffffff", cursor: "default" }}
      className="btn btn-md mr-1"
      name="quantity"
      onChange={handleChange}
    >
      {quantity}
    </button>
    <button
      style={{ background: "#EFEFEF" }}
      className="btn btn-md"
      alt=""
      onClick={() => handleQuantity("+")}
    >
      +
    </button>
  </div>
);