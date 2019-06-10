import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { Products } from "../../../components/products/Products";

const props = {
  products: [],
  pages: 1,
  actions: {
    fetchAllProducts: jest.fn(() => Promise.resolve())
  }
};

const page = {
  nextPage: {
    page: {
      selected: 1
    }
  }
};

const event = {
  preventDefault: jest.fn()
};

describe("<Products />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Products {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should simulate pagination button", () => {
    const wrapper = shallow(<Products {...props} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handlePagination");
    wrapper.instance().handlePagination(page);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("should simulate handle card flip button", () => {
    const wrapper = shallow(<Products {...props} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleCardFlip");
    wrapper.instance().handleCardFlip(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
});
