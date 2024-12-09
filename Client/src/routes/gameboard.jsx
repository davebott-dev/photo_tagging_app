import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "../App.css";

function Gameboard() {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

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
  }, [userId,guess]);

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
              const handleSubmit = async (e) => {
                e.preventDefault();

                const correct =
                  Math.abs(el.xCoord - guess[0]) <= 25 &&
                  Math.abs(el.yCoord - guess[1]) <= 25;

                const xCoord = guess[0];
                const yCoord = guess[1];
                const userId = game.user.id;
                const characterId = el.id;

                try {
                  const response = await fetch("/api/game/" + userId, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      xCoord,
                      yCoord,
                      userId,
                      characterId,
                      correct,
                    }),
                  });
                  if (response.ok) {
                    const data = await response.json();
                    console.log("guess",data);

                    if(data.hasWon) {
                      alert("congrats you won");
                      navigate('/');
                    }
                  }
                } catch (err) {
                  console.error(err);
                } finally {
                  setOpen(!open)
                }
              };
              return (
                <form key={index} id="charSelect" onSubmit={handleSubmit}>
                  <button className="imgBtn" >
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

/* if there is a true guess in each of the character arrays end the game and
return the time it took to complete*/

//when a user guesses correct remove the option to select that character from the list
//conditionally map only if there is no true in the array

//maybe create a prisma model that holds high score data from different users. 

