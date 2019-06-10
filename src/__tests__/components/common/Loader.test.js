import React from "react";
import {
  shallow
} from "enzyme";
import toJSON from "enzyme-to-json";
import Loader from "../../../components/common/Loader";

describe("<Loader />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow( < Loader / > );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});