import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(
    (ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => (
        <BurgerIngredient key={ingKey + i} type={ingKey} />
      ));
    }
  );
  // Equivalent to above
  //   const mapPropsToIngredientsArr = () => {
  //     let ingredientsArr = [];
  //     for (let [key, value] of Object.entries(props.ingredients)) {
  //       if (key === "meat") {
  //         for (let i = 0; i < value; i++) {
  //           ingredientsArr.push(<BurgerIngredient key={key + i} type="meat" />);
  //         }
  //       } else if (key === "cheese") {
  //         for (let i = 0; i < value; i++) {
  //           ingredientsArr.push(<BurgerIngredient key={key + i} type="cheese" />);
  //         }
  //       } else if (key === "bacon") {
  //         for (let i = 0; i < value; i++) {
  //           ingredientsArr.push(<BurgerIngredient key={key + i} type="bacon" />);
  //         }
  //       } else if (key === "salad") {
  //         for (let i = 0; i < value; i++) {
  //           ingredientsArr.push(<BurgerIngredient key={key + i} type="salad" />);
  //         }
  //       }
  //     }
  //     return ingredientsArr;
  //   };

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
