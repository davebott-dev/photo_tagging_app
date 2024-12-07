import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "./App.css";

function Index() {
  const [maps, setMaps] = useState([]);
  const [selected, setSelected]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setMaps(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const username = e.target.username.value;

    try{
      const response = await fetch('/api',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, selected}),
      });
      const data = response.json();
      console.log(data)
    } catch(err) {
      console.error('submission failed', err)
    } finally{
      navigate('game');
    }
  }

  return (
    <div id="indexContainer">
      <form onSubmit= {handleSubmit}>
        <div>
          <label htmlFor="username">Enter a username:</label>
          <input type="text" id="username" name="username" />
        </div>

        <div>
          <span>Choose a map:</span>
          {maps.map((map, index) => {
            return (
              <div key={index} className="mapSelection">
                <div>
                  <input
                    type="radio"
                    id="choice1"
                    name="map"
                    value="beach"
                    checked={selected}
                    onChange={handleChange}
                  />
                  {map.name}
                </div>
                <img
                  src={map.imgURL}
                  alt={`map selection ${index}`}
                  height={300}
                />
              </div>
            );
          })}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Index;

/* continue formatting selection page...when user selects a gameboard it takes them
to the page with that gameboard displayed...*/
//create time funcationality
//code in game logic functionality
