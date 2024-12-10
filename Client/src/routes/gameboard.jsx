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

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const sec = s % 60;
    return `${minutes.toString().padStart(2, "0")}: ${sec
      .toString()
      .padStart(2, "0")}`;
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
                      alert(
                        `Congrats ${game.user.username} you won in ${formatTime(
                          time
                        )}`

                        //on win fetch and post the user data and time to leaderboard schema
                      );
                      //display the leaderboard and navigate home
                      window.location.assign('http://localhost:5173/')
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

//maybe create a prisma model that holds high score data from different users.
