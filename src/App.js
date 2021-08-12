import React, {useState, useEffect} from 'react';
import ImageViewer from './image-viewer/Image-viewer';
import Selectors from './selectors/Selectors';
import {fetchData} from './utils'

import './App.css';

function App() {
  
  const [breeds, setBreeds] = useState(null);
  const [currentBreed , setCurrentBreed] = useState('')
  const [currentSubBreedList, setCurrentSubBreedList] = useState(null);

  const [currentSubBreed , setCurrentSubBreed] = useState('')
  const [currentImageData, setCurrentImageData] = useState(null)
  const [currentImageNumb, setCurrentImageNumb] = useState(1)

  useEffect(() => {
    fetchData('https://dog.ceo/api/breeds/list/all').then(data =>{
    setBreeds(Object.keys(data.message))
  })
  }, []);

const fetchImages = (e) =>{
  e.preventDefault()

  if(currentBreed){
    if(currentSubBreed){
    fetchData(`https://dog.ceo/api/breed/bluetick/images/random`).then(data =>{
      console.log(data)
    })
  }else{
    fetchData(`https://dog.ceo/api/breed/${currentBreed}/images/`).then(data =>{
      console.log(data)
    })
  }
  }
}
return (
 
    <div className="container">
        
        <form className="form-group" onSubmit={fetchImages}>
          <Selectors currentBreed={currentBreed} currentSubBreedList={currentSubBreedList} breeds={breeds} 
            setCurrentBreed={setCurrentBreed} setCurrentSubBreed={setCurrentSubBreed} setCurrentSubBreedList={setCurrentSubBreedList} currentSubBreed={currentSubBreed} />
        </form> 
     
     </div>
    
  );
}

export default App;
