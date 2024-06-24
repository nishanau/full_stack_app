import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 rounded-l"
      />
      <button className="p-2 bg-blue-500 text-white rounded-r ml-1 rounded-md hover:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
