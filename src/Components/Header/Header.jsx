import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../utility/firebase";
import classes from "./Header.module.css";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import LowerHeader from "./LowerHeader";

// ✅ Import your language context
import { useLanguage } from "../../utility/i18n.jsx";

function Header() {
  const { cartCount } = useCart();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  // Language dropdown
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef(null);

  const { language, changeLanguage, t } = useLanguage();

  // Language options
  const languages = [
    { code: "EN", flag: "https://flagcdn.com/us.svg", name: "English" },
    { code: "ES", flag: "https://flagcdn.com/es.svg", name: "Spanish" },
    { code: "FR", flag: "https://flagcdn.com/fr.svg", name: "French" },
    { code: "DE", flag: "https://flagcdn.com/de.svg", name: "German" },
    
  ];

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  // Search handlers
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSearchCategory(newCategory);

    if (newCategory !== "all") {
      navigate(`/search?category=${encodeURIComponent(newCategory)}`);
    } else {
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      navigate(
        `/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(
          searchCategory
        )}`
      );
      setSearchQuery("");
    }
  };

  // Language handlers
  const toggleLangDropdown = () => {
    setShowLangDropdown((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang); // ✅ use context function
    setShowLangDropdown(false);

    // Handle RTL for Arabic
    document.documentElement.dir = lang.code === "AR" ? "rtl" : "ltr";
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load saved language on mount (optional since context already handles it)
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      const langObj = JSON.parse(savedLang);
      changeLanguage(langObj);
    }
  }, []);

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
              <p>{t("deliveredTo")}</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form className={classes.search} onSubmit={handleSearch}>
          <select
            value={searchCategory}
            onChange={handleCategoryChange}
            className={classes.searchSelect}
          >
            <option value="all">{t("allCategories")}</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classes.searchInput}
          />

          <button type="submit" className={classes.searchButton}>
            <IoIosSearch />
          </button>
        </form>

        <div className={classes.right}>
          {/* Language Selector */}
          <div className={classes.lang} ref={langDropdownRef}>
            <div className={classes.langToggle} onClick={toggleLangDropdown}>
              <img src={language.flag} alt={language.name} />
              <span>{language.code}</span>
            </div>

            {showLangDropdown && (
              <div className={classes.langDropdown}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`${classes.langItem} ${
                      language.code === lang.code ? classes.langItemActive : ""
                    }`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    <img src={lang.flag} alt={lang.name} />
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className={classes.link} onClick={handleSignOut}>
              <p>Hello, {user.email.split("@")[0]}</p>
              <span>{t("signOut")}</span>
            </div>
          ) : (
            <Link to="/auth" className={classes.link}>
              <p>{t("signIn")}</p>
              <span>{t("accountLists")}</span>
            </Link>
          )}

          <Link to="/orders" className={classes.link}>
            <p>{t("returns")}</p>
            <span>{t("orders")}</span>
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
