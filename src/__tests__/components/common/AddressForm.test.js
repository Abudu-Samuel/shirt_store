import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import AddressForm from "../../../components/common/AddressForm";

const props = {
  state: {
    validation: {}
  }
};

describe("<AddressForm />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<AddressForm {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
