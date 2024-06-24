import React from 'react';

const CategoriesDropdown = () => {
  return (
    <select className="p-2 rounded bg-gray-700 text-white">
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="home">Home</option>
      <option value="beauty">Beauty</option>
    </select>
  );
};

export default CategoriesDropdown;
