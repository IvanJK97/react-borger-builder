import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((elem) => (
      <BuildControl
        key={elem.label}
        label={elem.label}
        added={() => props.addIngredient(elem.type)}
        removed={() => props.removeIngredient(elem.type)}
        disabled={props.disabled[elem.type]}
      />
    ))}
  </div>
);

export default buildControls;
