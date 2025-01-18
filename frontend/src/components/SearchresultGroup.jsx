import React from "react";

function SearchresultGroup({ data, click }) {
  return (
    <div className="search_result" onClick={click}>
      <img src={data.image} alt="" />

      <div className="search_result_data">
        <h3>{data.name}</h3>
        <p>{data.email}</p>
      </div>
    </div>
  );
}

export default SearchresultGroup;
