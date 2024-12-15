import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const Pagination = ({ totalPages }) => {
  const { state, dispatch } = useContext(AppContext);

  const handlePageChange = (event) => {
    dispatch({ type: "SET_PAGE", payload: Number(event.target.value) });
  };

  return (
    <div className="pagination">
      <label htmlFor="page-select">Sayfa Seç: </label>
      <select id="page-select" value={state.currentPage} onChange={handlePageChange}>
        {Array.from({ length: totalPages }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
