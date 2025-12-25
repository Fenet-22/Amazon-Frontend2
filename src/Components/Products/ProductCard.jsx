import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Rating, Box, Typography, Button } from "@mui/material";
import numeral from "numeral";
import classes from "./Product.module.css";

function ProductCard({ product, flex = false, showAddToCart = true }) {
  const { addToCart, cartItems } = useCart();
  const [hoverValue, setHoverValue] = useState(-1);

  // Safely get rating and count, defaulting to 0 if missing
  const localRating = product?.rating?.rate ?? product?.rating ?? 0;
  const ratingCount = product?.rating?.count ?? 0;

  // Check if product is in cart
  const isInCart = cartItems.some((item) => item.id === product?.id);

  const formattedPrice = numeral(product?.price ?? 0).format("$0,0.00");
  const formattedCount = numeral(ratingCount).format("0,0");

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    addToCart(product);
  };

  return (
    <Link to={`/product/${product?.id}`} className={classes.productLink}>
      <div className={`${classes.amazonCard} ${flex ? classes.flexCard : ""}`}>
        <img
          src={product?.image}
          alt={product?.title}
          className={classes.amazonImage}
        />

        <h4 className={classes.amazonTitle}>{product?.title}</h4>

        <Box className={classes.ratingContainer}>
          <Rating
            name="product-rating"
            value={localRating}
            precision={0.5}
            size="small"
            onChange={(event, newValue) => {
              if (newValue !== null) setHoverValue(newValue);
            }}
            onChangeActive={(event, newHover) => setHoverValue(newHover)}
          />
          <Typography variant="body2" className={classes.ratingText}>
            {hoverValue !== -1
              ? hoverValue.toFixed(1)
              : localRating.toFixed(1)}
            <span style={{ color: "#007185", marginLeft: "5px" }}>
              ({formattedCount})
            </span>
          </Typography>
        </Box>

        <p className={classes.amazonPrice}>{formattedPrice}</p>

        {showAddToCart && (
          <Button
            variant="contained"
            className={classes.amazonButton}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: isInCart ? "#FFD814" : "#FFD814",
              "&:hover": { backgroundColor: "#F7CA00" },
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "8px 16px",
              width: "100%",
              transition: "all 0.2s",
            }}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
