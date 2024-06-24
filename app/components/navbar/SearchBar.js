import React from 'react';
import { Input, Button } from 'antd';

const SearchBar = () => {
  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Search products..."
        className="rounded-l"
      />
      <Button type="primary" className="ml-2">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
