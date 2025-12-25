import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";

function CategoryCard({ title, image }) {
  /**
   * FakeStoreAPI category slugs MUST be:
   * - electronics
   * - jewelery
   * - men's clothing
   * - women's clothing
   *
   * Your route uses: /category/:name
   */
  const getCategorySlug = () => {
    switch (title) {
      case "Electronics":
        return "electronics";
      case "Jewelery":
        return "jewelery";
      case "Men's Clothing":
        return "mens-clothing"; // URL-friendly version
      case "Women's Clothing":
        return "womens-clothing"; // URL-friendly version
      default:
        return title.toLowerCase().replace(/\s+/g, '-');
    }
  };

  const categorySlug = getCategorySlug();

  return (
    <Link
      to={`/category/${categorySlug}`} // REMOVED encodeURIComponent
      className={classes.categoryCard}
    >
      {/* Title */}
      <h3 className={classes.cardTitle}>{title}</h3>

      {/* Image */}
      <div className={classes.cardImageContainer}>
        <img
          src={image}
          alt={title}
          className={classes.cardImage}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x200/e0e0e0/666?text=" +
              encodeURIComponent(title);
          }}
        />
      </div>

      {/* CTA */}
      <span className={classes.shopNow}>Shop now</span>
    </Link>
  );
}

export default CategoryCard;