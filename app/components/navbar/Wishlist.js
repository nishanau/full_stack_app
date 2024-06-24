import React from 'react';
import Link from 'next/link';

const Wishlist = () => {
  return (
    <Link href="/wishlist" className="text-white hover:text-gray-300">Wishlist</Link>
  );
};

export default Wishlist;
