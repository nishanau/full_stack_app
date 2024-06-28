// /components/ProductList.js
import React from "react";
import Product from "./Product";

const ProductList = ({ products, category }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
