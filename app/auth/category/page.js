// /app/[category]/page.js
import React from 'react';
import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ProductList from '../../components/ProductList';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{category}</h1>
      <ProductList products={products} category={category} />
    </div>
  );
};

export default CategoryPage;
