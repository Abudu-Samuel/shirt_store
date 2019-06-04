import types from "../actions/actionTypes";

const intialState = {
  orderData: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER:
      return {
        ...state,
        orderData: action.payload,
      }

      default:
        return state;
  }
};