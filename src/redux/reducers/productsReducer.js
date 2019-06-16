import types from "../actions/actionTypes";

const intialState = {
  products: [],
  isFetching: false,
  generalError: "",
  pages: null,
  category: "",
  department: "",
  query: "",
  searchProducts: [],
  product: {},
  quantity: "",
  updateQuantity: [],
  cart: [],
  cartId: [],
  cartItems: [],
  cartTotal: {
    total_amount: "$0.00"
  },
  purchasedProduct: [],
  catInDept: []
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.bool
      };

    case types.GENERAL_ERRORS:
      return {
        ...state,
        generalError: action.error
      };

    case types.FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
          pages: action.payload.count,
          product: []
      };

    case types.FETCH_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload,
          pages: action.payload.count,
          category: action.id
      };

    case types.FETCH_PRODUCT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        products: action.payload,
          pages: action.payload.count,
          department: action.id
      };

    case types.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        searchProducts: action.payload,
          pages: action.payload.count,
          query: action.query
      };

    case types.FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
          updateQuantity: state.updateQuantity
      };

    case types.GET_CART_ID:
      return {
        ...state,
        cartId: action.cartId
      };

    case types.ADD_TO_CART:
      return {
        ...state,
        cart: action.product
      };

    case types.UPDATE_QUANTITY:
      return {
        ...state,
        updateQuantity: action.payload
      };

    case types.GET_CART_ITEMS:
      return {
        ...state,
        cart: action.payload,
          isFetching: true
      };

    case types.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.item_id !== action.payload)
      };

    case types.ADD_CART_TOTAL:
      return {
        ...state,
        cartTotal: action.payload
      };

    case types.REGISTER_USER:
      return {
        ...state,
        registeredUser: action.payload
      };

    case types.STRIPE_CHARGE:
      return {
        ...state,
        purchasedProduct: action.payload,
          cart: [],
          cartTotal: {
            total_amount: "$0.00"
          }
      };

    case types.LOG_OUT:
      return {
        ...state,
        cart: [],
          cartTotal: {
            total_amount: "$0.00"
          }
      };

    case types.CAT_IN_DEPT:
      return {
        ...state,
        catInDept: action.payload
      }

      default:
        return state;
  }
};