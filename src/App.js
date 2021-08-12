import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Selectors from "./selectors/Selectors";
import Modal from "./modal/Modal";

import { fetchData } from "./utils";

import "./App.css";

function App() {
  const [breeds, setBreeds] = useState(null);
  const [currentBreed, setCurrentBreed] = useState("");
  const [currentSubBreedList, setCurrentSubBreedList] = useState(null);
  const [currentSubBreed, setCurrentSubBreed] = useState("");
  const [imagesData, setImagesData] = useState(null);
  const [numOfImgs, setNumOfImgs] = useState(null);
  const [currentImgNum, setCurrentImgNum] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showDownloadIcon, setShowDownloadIcon] = useState(false);

  useEffect(() => {
    fetchData("https://dog.ceo/api/breeds/list/all").then((data) => {
      setBreeds(Object.keys(data.message));
    });
  }, []);

  useEffect(() => {
    if (breeds) {
      setCurrentBreed(breeds[0]);
    }
  }, [setBreeds, breeds]);

  const fetchImages = (e) => {
    if (!currentBreed || !currentImgNum) {
      return alert("Please select a breed and number of images");
    }
    e.preventDefault();

    if (currentBreed) {
      if (currentSubBreed) {
        fetchData(
          `https://dog.ceo/api/breed/${currentBreed}/${currentSubBreed}/images/random/${currentImgNum}`
        ).then((data) => {
          if (data) {
            setImagesData(data.message);
          }
        });
      } else {
        fetchData(
          `https://dog.ceo/api/breed/${currentBreed}/images/random/${currentImgNum}`
        ).then((data) => {
          if (data) {
            setImagesData(data.message);
          }
        });
      }
    }
  };

  const getImageLength = () => {
    if (currentSubBreed) {
      fetchData(
        `https://dog.ceo/api/breed/${currentBreed}/${currentSubBreed}/images`
      ).then((data) => {
        setNumOfImgs(data.message.length);
      });
    } else {
      fetchData(`https://dog.ceo/api/breed/${currentBreed}/images`).then(
        (data) => {
          setNumOfImgs(data.message.length);
        }
      );
    }
  };

  const initialiseModalImage = async (image) => {
    await setModalImage(image);
    await setToggleModal(true);
  }
  return (   
    <>   
  <div onClick={toggleModal? ()=> setToggleModal(false): null}  className={toggleModal? "background-cover": null}></div>

    <div className="container">

      <form className="form-group" onSubmit={fetchImages}>
        <Selectors
          currentBreed={currentBreed}
          currentSubBreedList={currentSubBreedList}
          breeds={breeds}
          setCurrentImgNum={setCurrentImgNum}
          setCurrentSubBreedList={setCurrentSubBreedList}
          setCurrentBreed={setCurrentBreed}
          setCurrentSubBreed={setCurrentSubBreed}
          currentSubBreed={currentSubBreed}
          numOfImgs={numOfImgs}
          getImageLength={getImageLength}
          currentImgNum={currentImgNum}
        />
      </form>

      <div className="images-viewer">
      { showDownloadIcon ?
              <a href="#" download={modalImage}> 💾</a> :null}
        {imagesData
          ? imagesData.map((image, i) => {
              return (
                <LazyLoadImage
                onMouseEnter={() => setShowDownloadIcon(true)}
                onMouseLeave={() => setShowDownloadIcon(false)}
                  className="image-toggle"
                  src={image}
                  key={i}
                  width={200}
                  height={200}
                  onClick={() =>initialiseModalImage(image)}
                />
              );
            })
         
            
          : null}
      </div>
      {toggleModal ? (
        <Modal>
          {/* <span style={{color: 'red',position: 'absolute' ,top:'-3%', right: '10%'}}>close</span> */}
         <img src= {modalImage} alt='clicked-media' width='90%' height='90%' onClick={() =>setToggleModal(false)}/>
         <a  style={{ textDecoration: 'none'}}href="#" download={modalImage}> 💾</a>
        </Modal>
      ) : null}
    </div>
    </>
  );
}

export default App;
