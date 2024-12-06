import { useState,useEffect } from "react";
import "./App.css";

function Index() {
  const [maps,setMaps] =useState([])

useEffect(()=> {
  const fetchData = async() => {
    const response = await fetch('/api');
    const data = await response.json();
    setMaps(data);
  }
  fetchData();
},[]);  

  return (
    <div id="indexContainer">
        <form>
          <label htmlFor="username">Enter a username:</label>
          <input type="text" id="username" name="username"/>

          <span>Choose a map:</span>

          {maps.map((map,index)=> {
            return (
              <div key={index} className ="mapSelection">
                <div>
                  <input type="radio" />
                  {map.name}
                </div>
                <img src={map.imgURL} alt={`map selection ${index}`} height={300} />
              </div>
            )
          })}

          <button>Submit</button>

        </form>
    </div>
  );
}

export default Index;
