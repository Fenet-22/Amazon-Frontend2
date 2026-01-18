import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Your main App
import "./index.css";

//  Import your LanguageProvider
import { LanguageProvider } from "./utility/i18n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the whole app in LanguageProvider
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
