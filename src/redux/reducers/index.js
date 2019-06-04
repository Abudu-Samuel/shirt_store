import { combineReducers } from "redux";
import products from "./productsReducer";
import users from "./userReducer";
import orders from "./orderReducer"

export default combineReducers({
  products,
  users,
  orders
});
