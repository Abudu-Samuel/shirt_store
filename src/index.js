import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import toastr from "toastr";
import Routes from "./routes/index";
import configureStore from "./redux/store/config";
import "./App.css";
import "toastr/build/toastr.min.css";

const store = configureStore();

toastr.options = {
  showMethod: "slideDown",
  hideMethod: "slideUp",
  closeMethod: "slideUp",
  progressBar: true,
  closeButton: true,
  hideDuration: 1000,
  positionClass: "toast-top-right",
  timeOut: 1700
};

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
