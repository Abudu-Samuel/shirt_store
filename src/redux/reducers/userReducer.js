import types from "../actions/actionTypes";

const intialState = {
  userData: {},
  isFetching: false
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.bool
      };

    case types.REGISTER_USER:
      return {
        ...state,
        userData: action.payload
      };

    case types.SIGNIN_USER:
      return {
        ...state,
        userData: action.payload
      };

    case types.FACEBOOK_AUTH:
      return {
        ...state,
        userData: action.payload
      };

    case types.LOG_OUT:
      return {
        ...state,
        userData: {}
      };

    case types.GET_USER_INFO:
      return {
        ...state,
        userData: action.payload
      };

    case types.UPDATE_ADDRESS:
      return {
        userData: action.payload
      };

    default:
      return state;
  }
};
