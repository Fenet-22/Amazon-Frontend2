
import React from 'react'
import classes from "./Header.module.css";
import { CiMenuBurger } from "react-icons/ci";

function LowerHeader() {
  return (
    <div className={classes.lower_container}>
        <ul>
        <li>
            <CiMenuBurger />
            <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>customer service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader