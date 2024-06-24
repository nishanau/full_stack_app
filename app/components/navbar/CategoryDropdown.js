import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CategoriesDropdown = () => {
  const menu = (
    <Menu>
      <Menu.Item key="all">
        <a href="/category/all">All Categories</a>
      </Menu.Item>
      <Menu.Item key="electronics">
        <a href="/category/electronics">Electronics</a>
      </Menu.Item>
      <Menu.Item key="fashion">
        <a href="/category/fashion">Fashion</a>
      </Menu.Item>
      <Menu.Item key="home">
        <a href="/category/home">Home</a>
      </Menu.Item>
      <Menu.Item key="beauty">
        <a href="/category/beauty">Beauty</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <Button className="bg-gray-700 text-white">
        Categories <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default CategoriesDropdown;
