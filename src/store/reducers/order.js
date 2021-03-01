import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false, // Used in Checkout.js to see if we need to redirect
};

// Not using utility updateObject or refactoring here bc I like this better
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CHECKOUT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true, // Can share loading between checkout and orders page bc they're independent from each other
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
