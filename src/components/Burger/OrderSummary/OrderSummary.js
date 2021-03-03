import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // This could be a functional compoenent, used to debug for Improving Performance Lecture
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A scrumptious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.closeModal}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
