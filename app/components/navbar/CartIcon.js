import React from 'react';
import Link from 'next/link';
import { Typography } from 'antd';
import Image from 'next/image';

const { Text } = Typography;

const CartIcon = () => {
  return (
    <Link href="/cart" className="flex items-center text-white hover:text-gray-300">
      <Image src="/cart.svg" alt="Cart" width={20} height={20} />
      <Text className="ml-2 text-white hover:text-gray-300">Cart</Text>
    </Link>
  );
};

export default CartIcon;
