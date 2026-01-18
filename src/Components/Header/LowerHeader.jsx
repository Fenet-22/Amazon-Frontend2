import React from "react";
import classes from "./Header.module.css";
import { CiMenuBurger } from "react-icons/ci";

// ✅ Import language context
import { useLanguage } from "../../utility/i18n.jsx";

function LowerHeader() {
  const { t } = useLanguage(); // Get translation function

  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <CiMenuBurger />
          <p>{t("all")}</p>
        </li>
        <li>{t("todayDeals")}</li>
        <li>{t("customerService")}</li>
        <li>{t("registry")}</li>
        <li>{t("giftCards")}</li>
        <li>{t("sell")}</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
