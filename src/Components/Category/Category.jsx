import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import CarouselEffect from "../Carousel/Carousel";
import classes from "./Category.module.css";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        const products = response.data;

        // Map to get ONE image per category
        const categoryMap = {};

        products.forEach((product) => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
              title: formatCategoryName(product.category),
              image: product.image,
            };
          }
        });

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={classes.categoryWrapper}>
      {/* Carousel stays exactly as is */}
      <div className={classes.carouselContainer}>
        <CarouselEffect />
      </div>

      {/* Categories overlay - sits on carousel */}
      <div className={classes.categoriesOverlay}>
        <div className={classes.categoriesInner}>
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat.title}
              image={cat.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper to make category names prettier
const formatCategoryName = (category) => {
  switch (category) {
    case "electronics":
      return "Electronics";
    case "jewelery":
      return "Jewelery";
    case "men's clothing":
      return "Men's Clothing";
    case "women's clothing":
      return "Women's Clothing";
    default:
      return category;
  }
};

export default Category;
