import React,{useState, useEffect } from 'react'
import {fetchData} from '../utils'



 function Selectors({currentBreed,setCurrentBreed ,currentSubBreedList , 
    setCurrentSubBreedList, breeds, currentSubBreed,setCurrentSubBreed, fetchImages   }) {
    
    const [hasSubBreed, setHasSubBreed] = useState(true)
    

    useEffect(() =>{
        setHasSubBreed(true)
        if(currentBreed){
        fetchData(`https://dog.ceo/api/breed/${currentBreed}/list`).then(data => {
           setCurrentSubBreedList(data.message);
        if(!data.message.length){
            setHasSubBreed(false)
            
          }
       
          console.log(currentSubBreedList)
         
      })
    }
      },[currentBreed, setCurrentBreed]
      )
    
    return (
    <React.Fragment>
        <div className="selector">
          
          <label>Breed</label>
            {breeds?
              <select className={"form-control"}
              value={currentBreed}
              onChange={(e)=>setCurrentBreed(e.target.value)}
              >
              {breeds.map((breed, i) => {
                  return  <option key={i} value={breed}>{breed}</option>
              })
              }
            </select>
          :null }
          </div>

          <div className="selector">
          <label>Sub Breed</label>
            
              <select id={hasSubBreed ? null : "error-border" }   className={"form-control"}
              value={currentSubBreed}
              onChange={(e)=>setCurrentSubBreed(e.target.value)}
              >
            {currentSubBreedList?
            currentSubBreedList.map((breed, i) => {
                return  <option 
                key={i} value={breed}>{breed}</option>
            })
            :null}
            </select>
        </div>
        
        <button  type="submit" >View Images</button>
    </React.Fragment>

       )
}

export default Selectors