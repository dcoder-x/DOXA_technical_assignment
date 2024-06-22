// ProductFilter.jsx
import React, { Dispatch, SetStateAction } from 'react';


// the ui component taht renders the filter input
const ProductFilter = ({ filter, setFilter }:{filter:string,setFilter:Dispatch<SetStateAction<string>>}) => {
  return (
    <input
      type="text"
      placeholder="Filter by name"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary-500"
    />
  );
};

export default ProductFilter;
