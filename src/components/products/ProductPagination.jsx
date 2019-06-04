import React from "react";
import ReactPaginate from "react-paginate";

export default ({ handlePagination, pages }) => (
  <div>
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      onPageChange={handlePagination}
      pageCount={Math.ceil(pages / 8)}
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
);
