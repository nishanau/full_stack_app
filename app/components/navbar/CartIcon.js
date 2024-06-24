import React from 'react';
import Link from 'next/link';

const CartIcon = () => {
  return (
    <Link href="/cart" className="text-white relative hover:text-gray-300">
      Cart
      
    </Link>
  );
};

export default CartIcon;
