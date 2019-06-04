import React from "react";

export default ({ query }) => (
  <div className="text-center">
    <h5 className="grey-text mb-4 mt-4">0 products found</h5>
    <h6 className="mb-4 grey-text">
      Unfortunately there was no match found for{" "}
      <span className="field-error">{query}</span>, please try again
    </h6>
    <h6 className="grey-text">
      Sorry, the page you have requested was not found. Try searching for a
      brand or keyword.
    </h6>
  </div>
);
