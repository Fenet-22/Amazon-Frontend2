import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import classes from "./Payment.module.css";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../API/axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utility/firebase";
import Loader2 from "../../Components/Loader/Loader2";

// Stripe client - Ensure this is your actual public key
const stripePromise = loadStripe("pk_test_51Sh9fSFkdgfjwGpFvbos01ZbM4iCeBK2K7OBcM6DUHwqxd9t2eCUhyFKGoJaOlSZBkXWBC4Em4oiHPSKCNqfBsi800jiH9DwB7");

function CheckoutForm({ cartTotal, cartItems }) {
  const { user } = useUser();
  const { clearCart } = useCart(); 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Create Payment Intent on the server
      const { data } = await axios.post(`/payment/create?total=${Math.floor(cartTotal * 100)}`);
      const clientSecret = data.clientSecret;

      // 2. Confirm the payment with Stripe
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.email || "Guest",
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        // 3. Save order to Firestore (only if user exists)
        if (user?.uid) {
          await addDoc(collection(db, "users", user.uid, "orders"), {
            basket: cartItems,
            amount: cartTotal,
            created: new Date().getTime(), // Store as timestamp for easier sorting
            paymentId: payload.paymentIntent.id
          });
        }

        setError("");
        setSucceeded(true);
        setProcessing(false);
        
        // 4. Clear cart and redirect
        clearCart();
        navigate("/orders", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.checkoutForm}>
      <CardElement className={classes.cardElement} />
      {error && <p className={classes.error} style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <button 
        disabled={!stripe || processing || succeeded || cartItems.length === 0} 
        className={classes.payButton}
      >
        {processing ? <Loader2 /> : succeeded ? "Payment Succeeded!" : "Pay Now"}
      </button>
    </form>
  );
}

function Payment() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loginBanner, setLoginBanner] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoginBanner(true);
      const timer = setTimeout(() => navigate("/auth"), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className={classes.paymentContainer}>
      {loginBanner && <div className={classes.loginBanner}>You must login to proceed. Redirecting...</div>}

      <div className={classes.paymentHeader}>
        <h2>Checkout ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</h2>
      </div>

      <div className={classes.paymentContent}>
        <div className={classes.leftColumn}>
          <div className={classes.deliveryAddress}>
            <h3>Delivery Address</h3>
            <div><strong>Email:</strong> {user?.email}</div>
            <div><strong>Address:</strong> 123 React Street</div>
            <div>JavaScript City, JS 12345</div>
          </div>
        </div>

        <div className={classes.rightColumn}>
          <div className={classes.productsSection}>
            <h3>Review Items and Delivery</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className={classes.cartItem}>
                  <img src={item.image} alt={item.title} className={classes.itemImage} />
                  <div className={classes.itemDetails}>
                    <p className={classes.itemTitle}>{item.title}</p>
                    {/* Fixed star rating rendering */}
                    <p className={classes.itemRating}>
                      {"⭐".repeat(item.rating || 0)}
                    </p>
                    <p className={classes.itemQuantity}>Qty: {item.quantity}</p>
                    <p className={classes.itemPrice}>${item.price?.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={classes.paymentSection}>
            <h3>Payment Method</h3>
            <div className={classes.totalPrice}>
              <strong>Total to Pay: ${cartTotal.toFixed(2)}</strong>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm cartTotal={cartTotal} cartItems={cartItems} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;