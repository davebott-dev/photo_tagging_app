import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import "../App.css";

function Gameboard() {
  const [open, setOpen] = useState(false);
  const [game, setGame, time] = useOutletContext();
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
  }, [userId, guess]);

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
                    console.log("guess", data);

                    if (data.hasWon) {
                      const userId = game.user.id;
                      const gameboardId= game.game.id;
                      const timeVal = time;

                        try{
                          const response2 =await fetch("/api/game/" + userId +'/win',{
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              userId,
                              gameboardId,
                              timeVal,
                            }),
                          });
                          if(response2.ok) {
                            const score = await response.json();
                            console.log("New Score", score);
                          }
                        }catch(err) {
                          console.error("could not post to leaderboard",err)
                        }
                      window.location.assign('http://localhost:5173/leaderboard');
                    }
                  }
                } catch (err) {
                  console.error(err);
                } finally {
                  setOpen(!open);
                }
              };
              return el.Guess.find((val) => val.isCorrect == true) ? null : (
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

//figure out why I cant post to leaderboard--chatGPT
