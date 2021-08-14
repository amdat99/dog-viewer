import React from "react";
import { when } from "jest-when";
import { withHooks } from "jest-react-hooks-shallow";

import { shallow, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";

import Selectors from "./Selectors";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

const booleanTest = false;

let mockFetchImages = jest.fn();

let mockSetCurrentBreed = jest.fn();
let mockSetCurrentSubBreed = jest.fn();
let mockSetCurrentImgNum = jest.fn();
let mockSetCurrentSubBreedList = jest.fn();
let mockGetImageLength = jest.fn();
let mockSetHasSubBreed = jest.fn();
let mockFetchData = jest.fn();

let wrapper;
let wrapper2;
let wrapper3;
const mockProps = {
  message: [
    "https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190528_194200.jpg",
    "https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190601_185700.jpg",
  ],

  fetchImages: mockFetchImages,
  setCurrentBreed: mockSetCurrentBreed,
  setCurrentSubBreed: mockSetCurrentSubBreed,
  setCurrentImgNum: mockSetCurrentImgNum,
  setCurrentSubBreedList: mockSetCurrentSubBreedList,
  getImageLength: mockGetImageLength,
  setHasSubBreed: mockSetHasSubBreed,
  fetchData: mockFetchData,
};
beforeEach(() => {
  withHooks(() => {
    wrapper = toJson(shallow(<Selectors {...mockProps} />));
    wrapper2 = shallow(<Selectors {...mockProps} />);
  });
});

it("expect to render selectors component", () => {
  expect(wrapper2).toMatchSnapshot();
  console.log(wrapper2.debug());
});

it("expect setCurrentBreed to be called on onChange", () => {
  let breedSelect = wrapper2.find("select").first();
  breedSelect.simulate("change", { target: { value: "akita" } });
  breedSelect = wrapper2.find("select").first();
  expect(mockSetCurrentBreed).toHaveBeenCalled();
});

it("expects setCurrentSubBreed to be called on onChange", () => {
  let subBreedSelect = wrapper2.find(".form-control2");
  subBreedSelect.simulate("change", {
    target: { value: ["english", "american"] },
  });
  subBreedSelect = wrapper2.find(".form-control2");
  expect(mockSetCurrentSubBreed).toHaveBeenCalled();
});

it("expect SetCurrentImgNum to be called on onChange", () => {
  let subBreedSelect = wrapper2.find(".img-num");
  subBreedSelect.simulate("change", { target: { value: 1 } });
  subBreedSelect = wrapper2.find(".img-num");
  expect(mockSetCurrentImgNum).toHaveBeenCalled();
});

it("Testing useEffect on component load", () => {
  expect(mockGetImageLength).toHaveBeenCalled();
  expect(mockSetCurrentSubBreed).toHaveBeenCalled();
});

it("renders child correctly", () => {
  expect(wrapper2.find("#breed-select").children()).to.have.length(
    breeds.length
  );
});
