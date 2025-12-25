import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../utility/firebase";
import classes from "./Header.module.css";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import LowerHeader from "./LowerHeader";

function Header() {
  const { cartCount } = useCart();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // reset user context
      navigate("/auth"); // go to login page
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.left}>
          <Link to="/" className={classes.logo}>
            <img
              src="https://m.media-amazon.com/images/I/61+nI2GbVCL.png"
              alt="Amazon logo"
            />
          </Link>
          <div className={classes.location}>
            <CiLocationOn />
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select>
            <option>All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button>
            <IoIosSearch />
          </button>
        </div>

        <div className={classes.right}>
          <div className={classes.lang}>
            <img src="https://flagcdn.com/us.svg" alt="US flag" />
            <span>EN</span>
          </div>

          {user ? (
            <div
              className={classes.link}
              style={{ cursor: "pointer" }}
              onClick={handleSignOut}
            >
              <p>Hello, {user.email.split("@")[0]}</p>
              <span>Sign Out</span>
            </div>
          ) : (
            <Link to="/auth" className={classes.link}>
              <div>
                <p>Sign in</p>
                <span>Account & Lists</span>
              </div>
            </Link>
          )}

          <Link to="/orders" className={classes.link}>
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <span className={classes.cartCount}>{cartCount}</span>
          </Link>
        </div>
      </header>
      <LowerHeader />
    </>
  );
}

export default Header;
