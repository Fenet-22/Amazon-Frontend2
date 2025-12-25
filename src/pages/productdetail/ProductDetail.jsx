import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { Rating } from '@mui/material';
import classes from './productdetail.module.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isInCart = cartItems.some(item => item.id === product?.id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  if (!product) {
    return (
      <div className={classes.error}>
        <h2>Product not found</h2>
        <Link to="/">← Back to shopping</Link>
      </div>
    );
  }

  return (
    <div className={classes.productDetailPage}>
      <div className={classes.backLink}>
        <Link to="/">← Back to products</Link>
      </div>
      
      <div className={classes.productContainer}>
        <div className={classes.imageSection}>
          <img src={product.image} alt={product.title} className={classes.productImage} />
        </div>
        
        <div className={classes.detailsSection}>
          <h1 className={classes.productTitle}>{product.title}</h1>
          
          <div className={classes.ratingSection}>
            <Rating 
              value={product.rating?.rate || 0} 
              precision={0.5}
              readOnly
              size="large"
              sx={{
                '& .MuiRating-iconFilled': { color: 'black' },
                '& .MuiRating-iconEmpty': { color: '#CCCCCC' },
              }}
            />
            <span className={classes.ratingText}>
              {product.rating?.rate.toFixed(1)}({product.rating?.count})
            </span>
          </div>
          
          <div className={classes.priceSection}>
            <span className={classes.price}>${product.price.toFixed(2)}</span>
          </div>
          
          <div className={classes.descriptionSection}>
            <h3 className={classes.descriptionTitle}>Product Description</h3>
            <p className={classes.descriptionText}>{product.description}</p>
          </div>
          
          {/* ADD TO CART BUTTON */}
          <div className={classes.addToCartSection}>
            <button 
              className={isInCart ? classes.addedButton : classes.addToCartButton}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;