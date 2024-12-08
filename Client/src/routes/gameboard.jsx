import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function Gameboard() {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState([]);
  const { userId } = useParams();

  const handleClick = (e) => {
    setGuess([e.clientX, e.clientY]);
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/game/" + userId);
      const data = await response.json();
      console.log(data);
      setGame(data);
    };
    fetchData();
  }, [userId]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div id="indexContainer">
      <img
        className="gameImg"
        src={game.game.imgURL}
        onClick={handleClick}
      ></img>
      {open && (
        <div id="popup">
          <p>Select a Character</p>
          <div>
            {game.game.characters.map((el, index) => {
                const handleSubmit = async(e) => {
                  e.preventDefault();

                  const xCoord = guess[0];
                  const yCoord = guess[1];
                  const userId = game.user.id;
                  const characterId = el.id;
                  let isCorrect;
                  Math.abs(guess[0]-el.xCoord)<25 && Math.abs(guess[1] && yCoord)<25 ? isCorrect=true : isCorrect=false; 

                  try{
                    const response = await fetch('/api/game/'+userId, {
                      method:'POST',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({xCoord,yCoord,userId,characterId,isCorrect})
                    });
                    if(response.ok) {
                      const data = await response.json();
                      console.log(data);
                    }
                  } catch(err) {
                    console.error(err)
                  }
                }
              return (
                <form key={index} id="charSelect" onSubmit={handleSubmit}>
                  <button className="imgBtn">
                    <img
                      src={el.characterURL}
                      onClick={() => console.log(guess)}
                    />
                  </button>
                </form>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gameboard;
