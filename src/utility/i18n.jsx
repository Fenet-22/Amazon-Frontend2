// Language translations
export const translations = {
  EN: {
    // Header
    deliveredTo: "Delivered to",
    searchPlaceholder: "Search Amazon",
    allCategories: "All",
    signIn: "Sign in",
    accountLists: "Account & Lists",
    returns: "Returns",
    orders: "& Orders",
    cart: "Cart",
    signOut: "Sign Out",
    
    // Lower Header
    all: "All",
    todayDeals: "Today's Deals",
    customerService: "Customer Service",
    registry: "Registry",
    giftCards: "Gift Cards",
    sell: "Sell",
    
    // Search Results
    searchResults: "Search Results",
    resultsFor: "Results for",
    browsing: "Browsing",
    foundProducts: "Found {count} products",
    foundProduct: "Found {count} product",
    noProductsFound: "No products found",
    tryDifferentTerms: "Try different search terms or browse all products",
    browseAllProducts: "Browse All Products",
    viewAllProducts: "View All Products",
    
    // Products
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
  },
  
  ES: {
    deliveredTo: "Entregar a",
    searchPlaceholder: "Buscar en Amazon",
    allCategories: "Todos",
    signIn: "Iniciar sesión",
    accountLists: "Cuenta y Listas",
    returns: "Devoluciones",
    orders: "y Pedidos",
    cart: "Carrito",
    signOut: "Cerrar sesión",
    
    all: "Todos",
    todayDeals: "Ofertas del día",
    customerService: "Servicio al cliente",
    registry: "Registro",
    giftCards: "Tarjetas de regalo",
    sell: "Vender",
    
    searchResults: "Resultados de búsqueda",
    resultsFor: "Resultados para",
    browsing: "Navegando",
    foundProducts: "Se encontraron {count} productos",
    foundProduct: "Se encontró {count} producto",
    noProductsFound: "No se encontraron productos",
    tryDifferentTerms: "Prueba diferentes términos o navega por todos los productos",
    browseAllProducts: "Explorar todos los productos",
    viewAllProducts: "Ver todos los productos",
    
    addToCart: "Añadir al carrito",
    addedToCart: "Añadido al carrito",
  },
  
  FR: {
    deliveredTo: "Livrer à",
    searchPlaceholder: "Rechercher sur Amazon",
    allCategories: "Tous",
    signIn: "Se connecter",
    accountLists: "Compte et Listes",
    returns: "Retours",
    orders: "et Commandes",
    cart: "Panier",
    signOut: "Se déconnecter",
    
    all: "Tous",
    todayDeals: "Offres du jour",
    customerService: "Service client",
    registry: "Registre",
    giftCards: "Cartes-cadeaux",
    sell: "Vendre",
    
    searchResults: "Résultats de recherche",
    resultsFor: "Résultats pour",
    browsing: "Navigation",
    foundProducts: "{count} produits trouvés",
    foundProduct: "{count} produit trouvé",
    noProductsFound: "Aucun produit trouvé",
    tryDifferentTerms: "Essayez d'autres termes ou parcourez tous les produits",
    browseAllProducts: "Parcourir tous les produits",
    viewAllProducts: "Voir tous les produits",
    
    addToCart: "Ajouter au panier",
    addedToCart: "Ajouté au panier",
  },
  
  DE: {
    deliveredTo: "Liefern an",
    searchPlaceholder: "Amazon durchsuchen",
    allCategories: "Alle",
    signIn: "Anmelden",
    accountLists: "Konto und Listen",
    returns: "Rückgaben",
    orders: "und Bestellungen",
    cart: "Warenkorb",
    signOut: "Abmelden",
    
    all: "Alle",
    todayDeals: "Angebote des Tages",
    customerService: "Kundenservice",
    registry: "Registrierung",
    giftCards: "Geschenkkarten",
    sell: "Verkaufen",
    
    searchResults: "Suchergebnisse",
    resultsFor: "Ergebnisse für",
    browsing: "Durchsuchen",
    foundProducts: "{count} Produkte gefunden",
    foundProduct: "{count} Produkt gefunden",
    noProductsFound: "Keine Produkte gefunden",
    tryDifferentTerms: "Versuchen Sie andere Begriffe oder durchsuchen Sie alle Produkte",
    browseAllProducts: "Alle Produkte durchsuchen",
    viewAllProducts: "Alle Produkte anzeigen",
    
    addToCart: "In den Warenkorb",
    addedToCart: "Zum Warenkorb hinzugefügt",
  }
};

// Create a context/provider for language
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved ? JSON.parse(saved) : { code: 'EN', name: 'English' };
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', JSON.stringify(newLanguage));
  };

  const t = (key, params = {}) => {
    let translation = translations[language.code]?.[key] || translations.EN[key] || key;
    
    // Replace parameters in the translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};