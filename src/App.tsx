import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Selectors from "./selectors/Selectors";
import Modal from "./modal/Modal";

import { fetchData } from "./utils";

import "./App.css";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [currentSubBreedList, setCurrentSubBreedList] = useState([]);
  const [currentSubBreed, setCurrentSubBreed] = useState("");
  const [imagesData, setImagesData] = useState([]);
  const [numOfImgs, setNumOfImgs] = useState(1);
  const [currentImgNum, setCurrentImgNum] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  // const [showDownloadIcon, setShowDownloadIcon] = useState(false)
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    fetchData("https://dog.ceo/api/breeds/list/all").then((data) => {
      setBreeds(Object.keys(data.message));
    });
  }, []);

  useEffect(() => {
    if (breeds) {
      setCurrentBreed(breeds[0]);
      console.log(currentBreed);
    }
  }, [setBreeds, breeds, currentBreed]);

  const fetchImages = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!currentBreed || !currentImgNum) {
      return alert("Please select a breed and number of images");
    }

    if (currentBreed) {
      if (currentSubBreed) {
        console.log(currentSubBreed, currentBreed, currentImgNum);
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

  const initialiseModalImage = async (image: string) => {
    await setModalImage(image);
    await setToggleModal(true);
    setScrollX(document.documentElement.scrollTop);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const closeModal = () => {
    setToggleModal(false);
    window.scroll({
      top: scrollX,
      left: 0,
      behavior: "smooth",
    });
  };

  async function downloadImage(imageSrc: string) {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = currentBreed + "-" + currentSubBreed;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      {toggleModal ? (
        <div onClick={closeModal} className={"background-cover"}></div>
      ) : null}

      <div className="container">
        <form
          className="form-group"
          // @ts-ignore */
          onSubmit={fetchImages}
        >
          <Selectors
            currentBreed={currentBreed}
            currentSubBreedList={currentSubBreedList}
            breeds={breeds}
            setCurrentImgNum={setCurrentImgNum}
            // @ts-ignore */
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
            ? imagesData.map((image: string, i: number) => {
                return (
                  <LazyLoadImage
                    // onMouseEnter={() => setShowDownloadIcon(true)}
                    // onMouseLeave={() => setShowDownloadIcon(false)}
                    className="image-toggle"
                    src={image}
                    key={i}
                    width={200}
                    height={200}
                    onClick={() => initialiseModalImage(image)}
                  />
                );
              })
            : null}
        </div>
        {toggleModal ? (
          <Modal>
            {/* <span style={{color: 'red',position: 'absolute' ,top:'-3%', right: '10%'}}>close</span> */}
            <img
              src={modalImage}
              alt="clicked-media"
              className="modal-image"
              onClick={closeModal}
            />
            <span
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => downloadImage(modalImage)}
            >
              {" "}
              💾
            </span>
            <a
              data-pgaction-redirection="0"
              target="_blank"
              rel="noopener noreferrer"
              title={"dog image"}
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
