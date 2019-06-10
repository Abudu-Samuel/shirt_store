import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { ProductDetails } from "../../../components/products/ProductDetails";

const props = {
  product: {
    name: "Arc d'Triomphe",
    price: "14.99",
    image: "arc-d-triomphe-thumbnail.gif",
    image_2: "arc-d-triomphe-2.gif",
    description: "This beautiful and iconic T-shirt"
  },
  cartId: 101,
  match: {
    params: 1
  },
  actions: {
    fetchSingleProduct: jest.fn(() => Promise.resolve()),
    getCartId: jest.fn(() => Promise.resolve())
  }
};

const event = {
  target: {
    quantity: 2
  }
};

describe("<ProductDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ProductDetails {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("invokes handleChange method", () => {
    const wrapper = shallow(<ProductDetails {...props} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
});
