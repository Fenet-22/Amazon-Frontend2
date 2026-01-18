import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from "./utility/i18n"; // Import LanguageProvider
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import Results from "./pages/results/Results";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import Payment from "./pages/Payment/Payment";
import ProductDetail from "./pages/productdetail/ProductDetail";
import SearchResults from "./Components/SearchResults/SearchResults";

function App() {
  return (
    <LanguageProvider> {/* Wrap with LanguageProvider */}
      <UserProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/category/:name" element={<Results />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/auth" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* 404 page for unmatched routes */}
              <Route
                path="*"
                element={
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      marginTop: "90px",
                    }}
                  >
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;