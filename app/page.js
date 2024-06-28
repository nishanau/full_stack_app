"use client";
import React, { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/Product";
import Navbar from "./components/navbar/Navbar";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <Navbar onSelectCategory={handleCategorySelect} />
      <main className="flex flex-col items-center justify-center p-4 text-center pt-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Nishan's eCommerce Platform!
        </h1>
        <p className="text-lg mb-8">
          Explore a wide range of products and enjoy your shopping experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
