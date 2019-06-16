import axios from "axios";
import types from "./actionTypes";
import toaster from "../../components/utils/toaster";

const isFetching = bool => ({
  type: types.IS_FETCHING,
  bool
});

const generalError = error => ({
  type: types.GENERAL_ERRORS,
  error
});

const fetchProductsSuccess = payload => ({
  type: types.FETCH_ALL_PRODUCTS_SUCCESS,
  payload
});

const fetchCategorySuccess = (payload, id) => ({
  type: types.FETCH_PRODUCT_CATEGORY_SUCCESS,
  payload,
  id
});

const fetchDepartmentSuccess = (payload, id) => ({
  type: types.FETCH_PRODUCT_DEPARTMENT_SUCCESS,
  payload,
  id
});

const searchProductSuccess = (payload, query) => ({
  type: types.SEARCH_PRODUCT_SUCCESS,
  payload,
  query
});

const fetchSingleProductSuccess = payload => ({
  type: types.FETCH_SINGLE_PRODUCT,
  payload
});

const addToCart = product => ({
  type: types.ADD_TO_CART,
  product
});

const getCartIdSuccess = cartId => ({
  type: types.GET_CART_ID,
  cartId
});

const updateCartQuantity = payload => ({
  type: types.UPDATE_QUANTITY,
  payload
});

const getAllItemsInCart = payload => ({
  type: types.GET_CART_ITEMS,
  payload
});

const removeItemFromCart = payload => ({
  type: types.REMOVE_ITEM,
  payload
});

const addCartTotal = payload => ({
  type: types.ADD_CART_TOTAL,
  payload
});

const registerUser = payload => ({
  type: types.REGISTER_USER,
  payload
});

const loginUser = payload => ({
  type: types.SIGNIN_USER,
  payload
});

const facebookLogin = payload => ({
  type: types.FACEBOOK_AUTH,
  payload
});

const logOut = () => ({
  type: types.LOG_OUT
});

const userInfo = payload => ({
  type: types.GET_USER_INFO,
  payload
});

const updateAddress = payload => ({
  type: types.UPDATE_ADDRESS,
  payload
});

const createOrder = payload => ({
  type: types.CREATE_ORDER,
  payload
});

const createPayment = payload => ({
  type: types.STRIPE_CHARGE,
  payload
});

const fetchOrderSuccess = payload => ({
  type: types.FETCH_ALL_ORDERS,
  payload
});


const fetchSingleOrderSuccess = payload => ({
  type: types.FETCH_SINGLE_ORDER,
  payload
});

const fetchCatInDept = payload => ({
  type: types.CAT_IN_DEPT,
  payload
})

export const fetchAllProducts = page => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get(`https://backendapi.turing.com/products?page=${page}&limit=6`)
    .then(response => {
      dispatch(fetchProductsSuccess(response.data));
      dispatch(isFetching(false));
    })
    .catch(() => {
      dispatch(isFetching(false));
    });
};

export const fetchProductCategory = (id, page) => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get(
      `https://backendapi.turing.com/products/inCategory/${id}?page=${page}&limit=6`
    )
    .then(response => {
      dispatch(fetchCategorySuccess(response.data, id));
      dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const fetchProductDepartment = (id, page) => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get(
      `https://backendapi.turing.com/products/inDepartment/${id}?page=${page}&limit=6`
    )
    .then(response => {
      dispatch(fetchDepartmentSuccess(response.data, id));
      dispatch(categoryInDepartment(id))
      dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const categoryInDepartment = id => dispatch => {
  dispatch(isFetching(true));
  return axios.get(`https://backendapi.turing.com/categories/inDepartment/${id}`)
    .then(response => {
      dispatch(fetchCatInDept(response.data))
      dispatch(isFetching(false));

    });
};

export const searchProducts = (query, page) => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get(
      `https://backendapi.turing.com/products/search?query_string=${query}&page=${page}&limit=4`
    )
    .then(response => {
      dispatch(searchProductSuccess(response.data, query));
      dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const fetchSingleProduct = id => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get(`https://backendapi.turing.com/products/${id}`)
    .then(response => {
      dispatch(fetchSingleProductSuccess(response.data));
      dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const addToCartAction = (data, quantity) => async dispatch => {
  try {
    const response = await axios.post(
      "https://backendapi.turing.com/shoppingcart/add",
      data
    );
    await dispatch(addToCart(response.data));
    let itemId;
    response.data.filter(item => {
      if (item.product_id === data.product_id) {
        itemId = item.item_id;
      }
      return itemId;
    });
    await dispatch(updateQuantityAction(itemId, quantity));
    const cart_id = localStorage.getItem("cartId");
    const totalAmount = await axios.get(
      `https://backendapi.turing.com/shoppingcart/totalAmount/${cart_id}`
    );
    await dispatch(addCartTotal(totalAmount.data));
  } catch (error) {
    console.log("error occured", error);
  }
};

export const getCartId = () => dispatch => {
  dispatch(isFetching(true));
  return axios
    .get("https://backendapi.turing.com/shoppingcart/generateUniqueId")
    .then(response => {
      dispatch(getCartIdSuccess(response.data));
      dispatch(isFetching(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const updateQuantityAction = (item_id, quantity) => async dispatch => {
  try {
    const response = axios.put(
      `https://backendapi.turing.com/shoppingcart/update/${item_id}`, {
        quantity
      }
    );
    await dispatch(getCartItems(localStorage.getItem("cartId")));
    await dispatch(updateCartQuantity(response.data));
  } catch (error) {
    console.log("error occured", error);
  }
};

export const getCartItems = cartId => dispatch => {
  return axios
    .get(`https://backendapi.turing.com/shoppingcart/${cartId}`)
    .then(response => {
      dispatch(getAllItemsInCart(response.data));
      dispatch(sumCartTotal(localStorage.getItem("cartId")));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const removeItem = itemId => dispatch => {
  return axios
    .delete(
      `https://backendapi.turing.com/shoppingcart/removeProduct/${itemId}`
    )
    .then(() => {
      dispatch(removeItemFromCart(itemId));
      dispatch(sumCartTotal(localStorage.getItem("cartId")));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const sumCartTotal = cartId => dispatch => {
  return axios
    .get(`https://backendapi.turing.com/shoppingcart/totalAmount/${cartId}`)
    .then(response => {
      dispatch(addCartTotal(response.data));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isFetching(false));
    });
};

export const registerNewUser = data => dispatch => {
  return axios
    .post("https://backendapi.turing.com/customers", data)
    .then(response => {
      dispatch(registerUser(response.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      toaster("success", "Registration is successful!");
    })
    .catch(error => {
      dispatch(isFetching(false));
      toaster("error", error.response.data.error.message);
    });
};

export const loginRegisteredUser = data => dispatch => {
  return axios
    .post("https://backendapi.turing.com/customers/login", data)
    .then(response => {
      dispatch(loginUser(response.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      toaster("success", "Login is successful!");
    })
    .catch(error => {
      dispatch(isFetching(false));
      toaster("error", error.response.data.error.message);
    });
};

export const facebookAuthentication = token => dispatch => {
  return axios
    .post("https://backendapi.turing.com/customers/facebook", token)
    .then(response => {
      dispatch(facebookLogin(response.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      toaster("success", "Login is successful!");
    })
    .catch(error => {
      dispatch(isFetching(false));
      toaster("error", error.response.data.error.message);
    });
};

export const logOutAction = () => dispatch => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("cartId");
  dispatch(logOut({}));
};

export const getUserInformation = () => dispatch => {
  dispatch(isFetching(true));

  return axios
    .get("https://backendapi.turing.com/customer", {
      headers: {
        "USER-KEY": localStorage.getItem("accessToken")
      }
    })
    .then(response => {
      dispatch(userInfo(response.data));
      dispatch(isFetching(false));
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const updateUserAddress = data => dispatch => {
  return axios
    .put("https://backendapi.turing.com/customers/address", data, {
      headers: {
        "USER-KEY": localStorage.getItem("accessToken")
      }
    })
    .then(response => {
      dispatch(updateAddress(response.data));
      toaster("success", "Profile updated successfully!");
    })
    .catch(error => {
      toaster("error", error.response.data.error.message);
    });
};

export const createOrderAction = data => dispatch => {
  return axios
    .post("https://backendapi.turing.com/orders", data, {
      headers: {
        "USER-KEY": localStorage.getItem("accessToken")
      }
    })
    .then(response => {
      localStorage.setItem("orderId", response.data.orderId);
      dispatch(createOrder(response.data));
    });
};

export const createPaymentAction = data => dispatch => {
  return axios
    .post("https://backendapi.turing.com/stripe/charge", data)
    .then(response => {
      dispatch(createPayment(response.data));
      toaster("success", "Payment was successful");
    });
};

export const fetchAllOrders = () => dispatch => {
  dispatch(isFetching(true));
  return axios.get("https://backendapi.turing.com/orders/inCustomer", {
      headers: {
        "USER-KEY": localStorage.getItem("accessToken")
      }
    })
    .then(response => {
      dispatch(fetchOrderSuccess(response.data))
      dispatch(isFetching(false));
    })
}

export const fetchSingleOrder = id => dispatch => {
  dispatch(isFetching(true));
  return axios.get(`https://backendapi.turing.com/orders/${id}`, {
      headers: {
        "USER-KEY": localStorage.getItem("accessToken")
      }
    })
    .then(response => {
      dispatch(fetchSingleOrderSuccess(response.data));
      dispatch(isFetching(false));
    })
}