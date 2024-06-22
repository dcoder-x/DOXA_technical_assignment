// UserSort.jsx
import React, { Dispatch, SetStateAction } from 'react';

const Sort = ({ sort, setSort }:{sort:string,setSort:Dispatch<SetStateAction<string>>}) => {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary-500 ml-3"
    >
      <option value="">Sort by date</option>
      <option value="asc">Oldest to Newest</option>
      <option value="desc">Newest to Oldest</option>
    </select>
  );
};

export default Sort;