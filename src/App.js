import React, {useState, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


import Selectors from './selectors/Selectors';
import {fetchData} from './utils'

import './App.css';

function App() {
  
  const [breeds, setBreeds] = useState(null);
  const [currentBreed , setCurrentBreed] = useState('')
  const [currentSubBreedList, setCurrentSubBreedList] = useState(null);

  const [currentSubBreed , setCurrentSubBreed] = useState('')
  const [imagesData, setImagesData] = useState(['https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg'])
  const [numOfImgs, setNumOfImgs] = useState(null)
  const [currentImgNum,setCurrentImgNum] = useState(1)



  useEffect(() => {
    fetchData('https://dog.ceo/api/breeds/list/all').then(data =>{
    setBreeds(Object.keys(data.message))
  })
  }, []);
  
  
  useEffect(() => {
    if (breeds){
      setCurrentBreed(breeds[0])
    }
  },[setBreeds,breeds])

  const fetchImages = (e) =>{

  if(!currentBreed || !currentImgNum){
  return alert('Please select a breed and number of images')
  }
  e.preventDefault()


  if(currentBreed){
    if(currentSubBreed){ 
   
      fetchData(`https://dog.ceo/api/breed/${currentBreed}/${currentSubBreed}/images/random/${currentImgNum}`).then(data => {
        if(data){
        setImagesData(data.message)
        }

            })
    } else{
      fetchData(`https://dog.ceo/api/breed/${currentBreed}/images/random/${currentImgNum}`).then(data => {
        if (data){
       setImagesData(data.message)
      }
      })}
  }
}

const getImageLength = () =>{

  if(currentSubBreed){ 
   
    fetchData(`https://dog.ceo/api/breed/${currentBreed}/${currentSubBreed}/images`).then(data => {
    setNumOfImgs(data.message.length)
  })
  } else{
  fetchData(`https://dog.ceo/api/breed/${currentBreed}/images`).then(data => {
    setNumOfImgs(data.message.length)
  })}
  
}
return (
 
    <div className="container">
        
        <form className="form-group" onSubmit={fetchImages}>
         
          <Selectors currentBreed={currentBreed} currentSubBreedList={currentSubBreedList} breeds={breeds} setCurrentImgNum = {setCurrentImgNum} 
          setCurrentSubBreedList={setCurrentSubBreedList}  setCurrentBreed={setCurrentBreed} setCurrentSubBreed={setCurrentSubBreed} 
         currentSubBreed={currentSubBreed} numOfImgs={numOfImgs} getImageLength={getImageLength} currentImgNum={currentImgNum} />
        </form> 
    
      <div className="images-viewer">
          {imagesData?
              imagesData.map((image, i) => {
              return <LazyLoadImage className="image-toggle" src={image} key={i} width={200} height={200}/> 
          })
         :null}
      </div>
         
     </div>
    
  );
}

export default App;
