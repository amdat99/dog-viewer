import { useEffect } from "react";
import { withHooks } from "jest-react-hooks-shallow";

import { shallow, render, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";

import App from "./App.js";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

let mockFetchImages = jest.fn();
let mockFetchData = jest.fn();

let wrapper2;
let wrapper3;

const formEventMocked = { preventDefault: jest.fn() };
window.alert = jest.fn();

beforeEach(() => {
  const mockProps = {
    message: [
      "https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190528_194200.jpg",
      "https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190601_185700.jpg",
    ],

    fetchImages: mockFetchImages,
    fetchData: mockFetchData,
  };

  // wrapper = toJson(shallow(<App {...mockProps} />));
  wrapper2 = shallow(<App {...mockProps} />);
  wrapper3 = render(<App {...mockProps} />);
});

it("expect to render App component", () => {
  expect(wrapper2).toMatchSnapshot();

  console.log(wrapper2.debug());
});

it("expect alert to be called and img source undefined when fetchImages called ", () => {
  wrapper2.find("form").simulate("submit", formEventMocked);
  expect(wrapper3.find("image-toggle").prop("src")).toEqual(undefined);
  window.alert.mockClear();
});
