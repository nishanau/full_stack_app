// /components/Product.js
import React from "react";
import Image from "next/image";
import { Card, Button } from "antd";

const { Meta } = Card;

const Product = ({ product }) => {

  return (
    <Card
      hoverable
      cover={
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
        />
      }
    >
      <Meta title={product.name} description={`$${product.price}`} />
      <Button type="primary" className="mt-2">
        Add to Cart
      </Button>
    </Card>
  );
};

export default Product;
