import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Products from "../components/products/Products";
import ProductSearch from "../components/products/ProductSearch";
import ProductDetails from "../components/products/ProductDetails";
import Cart from "../components/cart/Cart";
import LoginForm from "../components/users/LoginForm";
import SignupForm from "../components/users/SignupForm";
import UserProfile from "../components/users/UserProfile";
import UpdateAddress from "../components/users/UpdateAddress";
import OrderProduct from "../components/order/OrderProduct";
import NotFoundPage from "../components/common/NotFoundPage";

export default () => (
  <BrowserRouter>
    <Fragment>
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route
          exact
          path="/products/search/query=:query"
          component={ProductSearch}
        />
        <Route exact path="/products/:product_id" component={ProductDetails} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={SignupForm} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/edit_address" component={UpdateAddress} />
        <Route exact path="/order" component={OrderProduct} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
