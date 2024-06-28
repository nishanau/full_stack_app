// components/Navbar.js
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";
import ProfileLinks from "./ProfileLinks";
import CategoriesDropdown from "./CategoriesDropdown";
import CartIcon from "./CartIcon";
import Wishlist from "./Wishlist";
import AuthLinks from "./AuthLinks";

const { SubMenu } = Menu;

const Navbar = ({ onSelectCategory }) => {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const menuItems = (
    <Menu mode="vertical" className="phone-menu">
      <Menu.Item key="home" style={{ color: "var(--foreground-color)" }}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="category" style={{ color: "var(--foreground-color)" }}>
        <CategoriesDropdown onSelectCategory={onSelectCategory} />
      </Menu.Item>
      <Menu.Item key="wishlist" style={{ color: "var(--foreground-color)" }}>
        <Wishlist />
      </Menu.Item>
      <Menu.Item key="cart" style={{ color: "var(--foreground-color)" }}>
        <CartIcon />
      </Menu.Item>
      {session ? (
        <Menu.Item key="profile" style={{ color: "var(--foreground-color)" }}>
          <ProfileLinks />
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="auth" style={{ color: "var(--foreground-color)" }}>
            <Link href="/auth/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </Menu.Item>
          <Menu.Item key="auth" style={{ color: "var(--foreground-color)" }}>
            <Link
              href="/auth/signup"
              className="text-white hover:text-gray-300"
            >
              Sign Up
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <nav className="bg-gray-700 h-12 p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-white text-lg font-bold hover:text-gray-300"
        >
          eCommerce
        </Link>
        <div className="hidden md:block ">
          <CategoriesDropdown onSelectCategory={onSelectCategory} />
        </div>
      </div>
      <SearchBar />
      <div className="hidden md:flex items-center space-x-4">
        <Wishlist />
        <CartIcon />
        {session ? <ProfileLinks /> : <AuthLinks />}
      </div>
      <Button
        className="md:hidden"
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <Drawer placement="right" onClose={closeDrawer} visible={visible}>
        {menuItems}
      </Drawer>
    </nav>
  );
};

export default Navbar;
