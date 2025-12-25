import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Products/Product"; // Import Product component
import classes from "./CategoryFullInfo.module.css";

function CategoryFullInfo() {
  const { name } = useParams();
  
  // Convert URL slug back to readable name
  const categoryName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className={classes.fullInfoContainer}>
      <div className={classes.categoryHeader}>
        <h1 className={classes.categoryTitle}>{categoryName}</h1>
        <p className={classes.categoryDescription}>
          Browse our collection of {categoryName.toLowerCase()}
        </p>
      </div>
      
      {/* Products for this specific category */}
      <div className={classes.productsSection}>
        <Product />
      </div>
    </div>
  );
}

export default CategoryFullInfo;