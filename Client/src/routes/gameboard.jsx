import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import "../App.css";

function Gameboard() {
  const [open, setOpen] = useState(false);
  const [game,setGame] = useState(null);
  const {userId} = useParams();

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch('/api/game/'+userId);
      const data = await response.json();
      console.log(data);
      setGame(data);
    }
    fetchData()
  }, [userId])

  if(!game) {
    return <p>Loading...</p>
  }
  
  return (
    <div id="indexContainer">
       <img
        className = 'gameImg'
        src={game.game.imgURL}
        onClick={handleClick}
      ></img>
      {open && (
        <div id="popup">
          <p>Select a Character</p>
          <div>
            {game.game.characters.map((el,index)=>{
              return (
                <img key={index} src={el.characterURL}/>
              )
            }) }
          </div>
        </div>
      )}
    </div>
  );
}

export default Gameboard;