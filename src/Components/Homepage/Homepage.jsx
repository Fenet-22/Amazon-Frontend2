import React from "react";
import Category from "../Category/Category";
import Product from "../Products/Product";

function Homepage() {
    return (
        <div className="homepage">
            <Category />
            <div style={{ padding: "20px", background: "#EAEDED" }}>
                <h2 style={{ textAlign: "center", margin: "30px 0", fontSize: "24px" }}>
                    
                </h2>
                <Product />
            </div>
        </div>
    );
}

export default Homepage;