import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { Navbar } from "../../../components/common/Navbar.jsx";

describe("<Navbar />", () => {
  const props = {
    products: [],
    cartTotal: "0.00",
    cart: [],
    searchTerm: "",
    history: {
      push: jest.fn()
    },
    actions: {
      getCartItems: jest.fn(() => Promise.resolve()),
      sumCartTotal: jest.fn(() => Promise.resolve()),
      logOutAction: jest.fn(() => Promise.resolve())
    }
  };

  const event = {
    target: {
      searchKeyWord: "random_value"
    }
  };

  it("renders without crashing", () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("invokes handleChange method", () => {
    const wrapper = shallow(<Navbar {...props} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("invokes handleLogOut method", () => {
    const wrapper = shallow(<Navbar {...props} />);
    const handleLogOutSpy = jest.spyOn(wrapper.instance(), "handleLogOut");
    wrapper.instance().handleLogOut(event);
    expect(handleLogOutSpy).toHaveBeenCalled();
  });
});
