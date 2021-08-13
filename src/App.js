import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Selectors from "./selectors/Selectors";
import Modal from "./modal/Modal";

import { fetchData } from "./utils";

import "./App.css";

function App() {
  const [breeds, setBreeds] = useState(['akitau']);
  const [currentBreed, setCurrentBreed] = useState("");
  const [currentSubBreedList, setCurrentSubBreedList] = useState(null);
  const [currentSubBreed, setCurrentSubBreed] = useState("");
  const [imagesData, setImagesData] = useState(null);
  const [numOfImgs, setNumOfImgs] = useState(null);
  const [currentImgNum, setCurrentImgNum] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showDownloadIcon, setShowDownloadIcon] = useState(false);
  const [scrollX, setScrollX] = useState(null)

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
    setScrollX(document.documentElement.scrollTop)
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }

  const closeModal =  () => {
    setToggleModal(false);
    window.scroll({
      top: scrollX, 
      left: 0, 
      behavior: 'smooth' 
     });
    
  }
  

  return (   
    <>   
  <div onClick={toggleModal? closeModal: null}  className={toggleModal? "background-cover": null}></div>

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
        
      <button id="view-button" type="submit">
        View Images
      </button>
      </form>

      <div className="images-viewer">
 
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
         <img src= {modalImage} alt='clicked-media' width='90%' height='90%' onClick={closeModal}/>
         <a  style={{ textDecoration: 'none'}}href="#" download={modalImage}> 💾</a>
         <a
            data-pgaction-redirection="0"
            target="_blank"
            rel="noopener noreferrer"
            title={'dog image'}
            href={`https://www.facebook.com/sharer.php?u=${window.location.href}?imageurl=${modalImage}`}
          >
           Facebook
          </a>
        </Modal>
      ) : null}
    </div>
    </>
  );
}

export default App;
