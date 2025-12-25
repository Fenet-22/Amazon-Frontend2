import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import classes from './cart.module.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className={classes.cartPage}>
      <div className={classes.cartContainer}>
        <h1 className={classes.title}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className={classes.emptyCart}>
            <h2>Your Amazon Cart is empty</h2>
            <Link to="/" className={classes.shopBtn}>Shop today's deals</Link>
          </div>
        ) : (
          <div className={classes.cartContent}>
            <div className={classes.itemsSection}>
              <div className={classes.cartHeader}>
                <h2>Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h2>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className={classes.cartItem}>
                  <img src={item.image} alt={item.title} className={classes.itemImage} />
                  <div className={classes.itemDetails}>
                    <h3>{item.title}</h3>
                    <p className={classes.inStock}>In Stock</p>
                    <div className={classes.quantityControl}>
                      <div className={classes.quantity}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>Item: {item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className={classes.divider}>|</span>
                      <button className={classes.removeBtn} onClick={() => removeFromCart(item.id)}>Delete</button>
                    </div>
                  </div>
                  <div className={classes.itemPrice}>
                    <span className={classes.price}>${(item.price * item.quantity).toFixed(2)}</span>
                    {item.quantity > 1 && <span className={classes.eachPrice}>${item.price.toFixed(2)} each</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.summary}>
              <div className={classes.summaryBox}>
                <div className={classes.totalRow}>
                  <span>Total ({cartCount} items):</span>
                  <span className={classes.totalAmount}>${cartTotal.toFixed(2)}</span>
                </div>
                <div className={classes.giftOption}>
                  <input type="checkbox" id="gift" />
                  <label htmlFor="gift">This order contains a gift</label>
                </div>
                
                <Link to="/payment" className={classes.checkoutBtn}>
                  Proceed to checkout
                </Link>
                
                <Link to="/" className={classes.continueBtn}>
                  ← Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
