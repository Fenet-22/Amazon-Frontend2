import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Products/ProductCard";
import Loader from "../Loader/Loader";
import classes from "./SearchResults.module.css";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";
  const searchCategory = queryParams.get("category") || "all";

  useEffect(() => {
    console.log("SearchResults: Fetching products...");
    setLoading(true);
    
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        console.log("SearchResults: Successfully fetched", res.data.length, "products");
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("SearchResults: Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];
    
    // Filter by category if not "all"
    if (searchCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === searchCategory.toLowerCase()
      );
    }
    
    // Filter by search query if provided - IMPROVED LOGIC
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
      const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 0);
      
      filtered = filtered.filter(product => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.toLowerCase();
        
        // Check if ANY query word matches (OR logic)
        const matches = queryWords.some(word => {
          const hasMatch = title.includes(word) || 
                          description.includes(word) || 
                          category.includes(word);
          return hasMatch;
        });
        
        return matches;
      });
      
      console.log("Found", filtered.length, "products matching query");
    }

    console.log("SearchResults: Filtered to", filtered.length, "products");
    console.log("Query:", searchQuery, "Category:", searchCategory);
    setFilteredProducts(filtered);
  }, [products, searchQuery, searchCategory]);

  const getCategoryDisplayName = (apiCategory) => {
    const categoryMap = {
      "all": "All Products",
      "electronics": "Electronics",
      "jewelery": "Jewelery",
      "men's clothing": "Men's Clothing",
      "women's clothing": "Women's Clothing"
    };
    return categoryMap[apiCategory] || apiCategory;
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Loader color="#0066cc" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.searchResultsContainer}>
        <div className={classes.error}>
          Error loading products: {error}
        </div>
      </div>
    );
  }

  // Show all products if no query and category is "all"
  const showAllProducts = searchCategory === "all" && !searchQuery;

  return (
    <div className={classes.searchResultsContainer}>
      <div className={classes.searchHeader}>
        {searchQuery ? (
          <>
            <h1 className={classes.searchTitle}>
              Results for "<span className={classes.highlight}>{searchQuery}</span>"
            </h1>
            {searchCategory !== "all" && (
              <p className={classes.searchSubtitle}>
                in <span className={classes.categoryBadge}>{getCategoryDisplayName(searchCategory)}</span>
              </p>
            )}
          </>
        ) : searchCategory !== "all" ? (
          <>
            <h1 className={classes.searchTitle}>
              {getCategoryDisplayName(searchCategory)}
            </h1>
            <p className={classes.searchSubtitle}>
              Browse our {getCategoryDisplayName(searchCategory).toLowerCase()} collection
            </p>
          </>
        ) : (
          <>
            <h1 className={classes.searchTitle}>All Products</h1>
            <p className={classes.searchSubtitle}>
              Showing all available products
            </p>
          </>
        )}
        
        <div className={classes.resultsInfo}>
          <span className={classes.resultsCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
          </span>
          
          {searchQuery && (
            <div className={classes.searchTips}>
              <p>Search tips:</p>
              <ul>
                <li>Try different keywords like "jacket", "phone", "watch"</li>
                <li>Check spelling</li>
                <li>Use fewer words for broader results</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Category Filter Chips (only show when there's a search query) */}
      {searchQuery && (
        <div className={classes.categoryFilterBar}>
          <div className={classes.filterTitle}>Filter results by category:</div>
          <div className={classes.categoryChips}>
            <button 
              className={`${classes.categoryChip} ${searchCategory === 'all' ? classes.active : ''}`}
              onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}&category=all`)}
            >
              All Categories
            </button>
            <button 
              className={`${classes.categoryChip} ${searchCategory === 'electronics' ? classes.active : ''}`}
              onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}&category=electronics`)}
            >
              Electronics
            </button>
            <button 
              className={`${classes.categoryChip} ${searchCategory === 'jewelery' ? classes.active : ''}`}
              onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}&category=jewelery`)}
            >
              Jewelry
            </button>
            <button 
              className={`${classes.categoryChip} ${searchCategory === "men's clothing" ? classes.active : ''}`}
              onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}&category=men's clothing`)}
            >
              Men's Clothing
            </button>
            <button 
              className={`${classes.categoryChip} ${searchCategory === "women's clothing" ? classes.active : ''}`}
              onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}&category=women's clothing`)}
            >
              Women's Clothing
            </button>
          </div>
        </div>
      )}
      
      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className={classes.noResults}>
          <div className={classes.noResultsIcon}>🔍</div>
          <h2>No products found</h2>
          <p>
            {searchQuery 
              ? `No results found for "${searchQuery}"${searchCategory !== 'all' ? ` in ${getCategoryDisplayName(searchCategory)}` : ''}`
              : `No products found in ${getCategoryDisplayName(searchCategory)}`
            }
          </p>
       
          
        <button 
            className={classes.primaryButton}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={classes.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;