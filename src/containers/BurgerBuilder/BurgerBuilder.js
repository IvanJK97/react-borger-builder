import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders"; // Using customized axios instance

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-burger-builder-72213-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  // Cannot buy a burger unless it has at least one ingredient
  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients,
    };
    // Map each ingredient key to its count value, then reduce that array to a single sum
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, currIngCount) => {
        return sum + currIngCount;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
      },
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
      },
      this.updatePurchaseState
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // Sending data to Firebase realtime database
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Ivan Kok",
        address: {
          street: "Test street 1",
          zipCode: "12345",
          country: "United States",
        },
        email: "example@email.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          closeModal={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
