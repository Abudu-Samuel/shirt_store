import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import types from "../../redux/actions/actionTypes";
import {
  fetchAllProducts,
  fetchProductCategory,
  fetchProductDepartment
} from "../../redux/actions/actionCreators";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("product action tests", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("should retreive all products", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          count: 101,
          rows: []
        }
      });
    });
    const returnedActions = [
      { type: types.IS_FETCHING, bool: true },
      {
        type: types.FETCH_ALL_PRODUCTS_SUCCESS,
        payload: {
          count: 101,
          rows: []
        }
      },
      { type: types.IS_FETCHING, bool: false }
    ];
    const store = mockStore({});
    await store.dispatch(fetchAllProducts());
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });

  it("should retreive all products in category", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          count: 101,
          rows: []
        }
      });
    });
    const returnedActions = [
      { type: types.IS_FETCHING, bool: true },
      {
        type: types.FETCH_PRODUCT_CATEGORY_SUCCESS,
        payload: {
          count: 101,
          rows: []
        }
      },
      { type: types.IS_FETCHING, bool: false }
    ];
    const store = mockStore({});
    await store.dispatch(fetchProductCategory());
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });

  it("should retreive all products in department", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          count: 101,
          rows: []
        }
      });
    });
    const returnedActions = [
      { type: types.IS_FETCHING, bool: true },
      {
        type: types.FETCH_PRODUCT_DEPARTMENT_SUCCESS,
        payload: {
          count: 101,
          rows: []
        }
      },
      { type: types.IS_FETCHING, bool: false }
    ];
    const store = mockStore({});
    await store.dispatch(fetchProductDepartment());
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });
});
