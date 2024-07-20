'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { products } from '../../data/products';
import ProductList from '../../components/ProductList';

const CategoryPage = () => {
  const params = useParams();
  const category = params?.category;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category) {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  }, [category]);

  if (!category) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{category}</h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;
