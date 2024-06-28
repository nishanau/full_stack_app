import React from "react";
import Link from "next/link";
import { Typography } from "antd";
import Image from "next/image";

const { Text } = Typography;

const CartIcon = () => {
  return (
    <div className="items-center">
      <Link href="/cart" className="flex  text-white hover:text-gray-300">
        <Image src="/cart.png" alt="Cart" width={20} height={20} />
       <div>Cart</div> 
      </Link>
    </div>
  );
};

export default CartIcon;
