import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import classes from "./Product.module.css";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(true); // Prevent state updates after unmount

    useEffect(() => {
        // Set mounted to true when component mounts
        setMounted(true);
        
        console.log("Product.jsx: Starting to fetch ALL products");
        setLoading(true);
        
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                if (mounted) {
                    console.log("Product.jsx: Successfully fetched", res.data.length, "products");
                    setProducts(res.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (mounted) {
                    console.error("Product.jsx: Fetch error:", err);
                    setError(err.message);
                    setLoading(false);
                }
            });
        
        // Cleanup function
        return () => {
            console.log("Product.jsx: Component unmounting");
            setMounted(false);
        };
    }, [mounted]);

    if (loading) {
        console.log("Product.jsx: Showing loader");
        return (
            <div className={classes.loadingContainer}>
                <Loader color="#0066cc" />
            </div>
        );
    }

    if (error) {
        return <div className={classes.error}>Error: {error}</div>;
    }

    console.log("Product.jsx: Rendering", products.length, "products");
    return (
        <div className={classes.products}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default Product;