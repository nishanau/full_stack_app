import React from 'react';
import { Menu, Dropdown, Button } from 'antd';

const CategoriesDropdown = ({ onSelectCategory }) => {
  const handleMenuClick = (e) => {
    onSelectCategory(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All Categories</Menu.Item>
      <Menu.Item key="electronics">Electronics</Menu.Item>
      <Menu.Item key="fashion">Fashion</Menu.Item>
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="beauty">Beauty</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <span className=" hover:text-gray-300 cursor-pointer">
        Categories
      </span>
    </Dropdown>
  );
};

export default CategoriesDropdown;
