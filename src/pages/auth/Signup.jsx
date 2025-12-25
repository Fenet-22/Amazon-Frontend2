import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utility/firebase";
import { useUser } from "../../context/UserContext";
import classes from "./Signup.module.css";
import Loader2 from "../../Components/Loader/Loader2";

function Signup() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path after login/signup
  const from = location.state?.from || "/";

  // Handles login or signup
  const handleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      let userCredential;
      if (isNewAccount) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      setUser(userCredential.user); // update global user state

      // Redirect to the page the user came from
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className={classes.container}>
      {/* Amazon Logo */}
      <div
        className={classes.logo}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SG_50RFWq0gQOM8L_joCCbFRmpdvaDuxVQ&s"
          alt="Amazon"
        />
      </div>

      {/* Auth Card */}
      <div className={classes.card}>
        <div className={classes.title}>
          <h3>{isNewAccount ? "Create Account" : "Sign In"}</h3>
        </div>

        {/* Email Input */}
        <div className={classes.input}>
          <label htmlFor="email">Enter Mobile Number or Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Auth Button */}
        <div className={classes.button}>
          <button type="button" onClick={handleAuth} disabled={loading}>
            {loading ? <Loader2 /> : isNewAccount ? "Create New Account" : "Continue"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className={classes.error}>{error}</p>}

        {/* Agreement */}
        {!isNewAccount && (
          <p className={classes.agreement}>
            By continuing, you agree to Amazon's <a href="/">Conditions of Use</a> and{" "}
            <a href="/">Privacy Notice</a>.
          </p>
        )}

        {/* Toggle Signup/Login with same styling as agreement */}
        <div className={classes.toggle}>
          {isNewAccount ? (
            <p className={classes.agreement}>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setIsNewAccount(false);
                  setError("");
                }}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className={classes.agreement}>
              New to Amazon?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setIsNewAccount(true);
                  setError("");
                }}
              >
                Create an account
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
