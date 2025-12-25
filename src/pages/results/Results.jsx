import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Components/Products/ProductCard';
import Loader from '../../Components/Loader/Loader';
import classes from './results.module.css';

function Results() {
  const { name } = useParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("DEBUG: Fetching products for category:", name);
    
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        console.log("DEBUG: Total products from API:", res.data.length);
        
        // Updated URL slug to API category mapping
        const urlToApiMap = {
          'electronics': 'electronics',
          'jewelery': 'jewelery',
          'mens-clothing': "men's clothing", // Map URL slug to API category
          'womens-clothing': "women's clothing", // Map URL slug to API category
          'fashion': ["men's clothing", "women's clothing"]
        };
        
        const apiCategories = urlToApiMap[name];
        console.log("DEBUG: Mapping", name, "→", apiCategories);
        
        let filteredProducts = [];
        
        if (Array.isArray(apiCategories)) {
          filteredProducts = res.data.filter(product => 
            apiCategories.includes(product.category)
          );
        } else if (apiCategories) {
          filteredProducts = res.data.filter(product => 
            product.category === apiCategories
          );
        } else {
          console.log("DEBUG: No mapping found for:", name);
          filteredProducts = [];
        }
        
        console.log("DEBUG: Found", filteredProducts.length, "products");
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error("DEBUG: API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  const getDisplayTitle = () => {
    const titleMap = {
      'electronics': 'Electronics',
      'jewelery': 'Jewelery',
      'mens-clothing': "Men's Clothing",
      'womens-clothing': "Women's Clothing",
      'fashion': 'Fashion (Men & Women)'
    };
    
    return titleMap[name] || name;
  };

  const displayTitle = getDisplayTitle();

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Loader color="#000000" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.resultsPage}>
        <div className={classes.error}>Error: {error}</div>
        <Link to="/" className={classes.backLink}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={classes.resultsPage}>
      <div className={classes.resultsHeader}>
        <h1>{displayTitle}</h1>
        <p>{products.length} products found</p>
      </div>
      
      {products.length === 0 ? (
        <div className={classes.noResults}>
          <h2>No products found</h2>
          <p>Your URL slug "{name}" doesn't match any API categories.</p>
          <p><strong>Valid URL slugs are:</strong></p>
          <ul>
            <li><code>/category/electronics</code> → Electronics</li>
            <li><code>/category/jewelery</code> → Jewelery</li>
            <li><code>/category/mens-clothing</code> → Men's Clothing</li>
            <li><code>/category/womens-clothing</code> → Women's Clothing</li>
            <li><code>/category/fashion</code> → All Clothing</li>
          </ul>
          <Link to="/" className={classes.backLink}>← Back to Home</Link>
        </div>
      ) : (
        <>
          <div className={classes.productsGrid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={classes.backToHome}>
            <Link to="/" className={classes.backLink}>← Back to Home</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Results;