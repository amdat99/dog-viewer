import React, { useState, useEffect } from "react";
import { fetchData } from "../utils";

import "./Selectors.css";

type selectorProps = {
  currentBreed: string;
  setCurrentBreed: (breed: string) => void;
  currentSubBreedList: Array<string>;
  breeds: Array<string>;
  currentSubBreed: string;
  currentImgNum: number;
  setCurrentImgNum: (value: number) => void;
  numOfImgs: number;
  setCurrentSubBreed: (value: string) => void;
  getImageLength: () => void;
  setCurrentSubBreedList: (value: string[]) => void;
};

function Selectors({
  currentBreed,
  setCurrentBreed,
  currentSubBreedList,
  setCurrentImgNum,
  currentImgNum,
  setCurrentSubBreedList,
  breeds,
  currentSubBreed,
  setCurrentSubBreed,
  numOfImgs,
  getImageLength,
}: selectorProps) {
  const [hasSubBreed, setHasSubBreed] = useState(true);

  const onChangeBreedSelect = () => {
    setHasSubBreed(true);
    setCurrentSubBreedList([]);
    setCurrentSubBreed("");
  };

  useEffect(() => {
    onChangeBreedSelect();
    if (currentBreed) {
      fetchData(`https://dog.ceo/api/breed/${currentBreed}/list`).then(
        (data) => {
          if (!data.message.length) {
            setHasSubBreed(false);
            setCurrentSubBreed("");
          } else {
            setCurrentSubBreedList(data.message);
            setCurrentSubBreed(data.message[0]);
          }
        }
      );
    }
    //eslint-disable-next-line
  }, [currentBreed, setCurrentBreed]);

  useEffect(() => {
  getImageLength()
  }, [setCurrentSubBreed, currentSubBreed, getImageLength]);

  return (
    <React.Fragment>
      <div className="selector">
        <label>Breed</label>

        <select
          id="breed-select"
          className={"form-control"}
          value={currentBreed}
          onChange={(e) => setCurrentBreed(e.target.value)}
        >
          {breeds.map((breed, i) => {
            return (
              <option id="breed-option" key={i} value={breed}>
                {breed}
              </option>
            );
          })}
        </select>
      </div>

      <div className="selector">
        <label>Sub Breed</label>

        <select
          // @ts-ignore */
          id={hasSubBreed ? null : "error-border"}
          className={"form-control2"}
          value={currentSubBreed}
          onChange={(e) => setCurrentSubBreed(e.target.value)}
        >
          {currentSubBreedList
            ? currentSubBreedList.map((breed, i) => {
                return (
                  <option key={i} value={breed}>
                    {breed}
                  </option>
                );
              })
            : null}
        </select>
        {currentSubBreed && currentSubBreed.length > 1 ? (
          <span id="sub-reset" onClick={() => setCurrentSubBreed("")}>
            {" "}
            all sub breeds
          </span>
        ) : null}
      </div>

      <div className="selector-num">
        <label>Num of Images ({numOfImgs})</label>
        <input
          // @ts-ignore */
          id={currentImgNum > numOfImgs ? "error-border" : null}
          type="number"
          className="img-num"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setCurrentImgNum(parseInt(e.target.value));
          }}
          name="quantity"
          min="1"
          max={numOfImgs}
        />
      </div>
    </React.Fragment>
  );
}

export default Selectors;
