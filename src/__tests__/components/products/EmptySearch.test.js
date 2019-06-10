import React from "react";
import {
  shallow
} from "enzyme";
import toJSON from "enzyme-to-json";
import EmptySearchResult from "../../../components/products/EmptySearchResult";

describe("<EmptySearchResult />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow( < EmptySearchResult / > );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});