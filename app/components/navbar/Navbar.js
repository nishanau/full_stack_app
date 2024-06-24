import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import AuthLinks from './AuthLinks';
import ProfileLinks from './ProfileLinks';
import CategoriesDropdown from './CategoryDropdown';
import CartIcon from './CartIcon';
import Wishlist from './Wishlist';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white text-lg font-bold hover:text-gray-300">eCommerce</Link>
        <CategoriesDropdown />
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar />
        <Wishlist />
        <CartIcon />
        {session ? <ProfileLinks /> : <AuthLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
