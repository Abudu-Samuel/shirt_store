import types from "../actions/actionTypes";

const intialState = {
  orderData: {},
  isFetching: false
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.bool
      };

    case types.CREATE_ORDER:
      return {
        ...state,
        orderData: action.payload
      };

    case types.FETCH_ALL_ORDERS:
      return {
        ...state,
        orderData: action.payload
      };

    case types.FETCH_SINGLE_ORDER:
      return {
        ...state,
        orderData: action.payload
      };

    default:
      return state;
  }
};
