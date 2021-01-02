import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo}>
    {/* Need to import with webpack here so use it like this instead of src url */}
    <img src={burgerLogo} alt="BurgerLogo"></img>
  </div>
);

export default logo;
