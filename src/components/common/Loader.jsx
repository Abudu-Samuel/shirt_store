import React from 'react';
import Loader from "react-loader-spinner";

export default () => (
  <div className="loader">
    <Loader
      type="CradleLoader"
      color="#f7436b"
      height="100"
      width="100"
      className="loader"
    />
  </div>
)