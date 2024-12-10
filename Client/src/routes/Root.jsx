import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

function Root() {
  const [game, setGame] = useState(null);
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(0);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const sec = s % 60;
    return `${minutes.toString().padStart(2, "0")}: ${sec
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (game) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [game]);

  return (
    <div id="rootContainer">
      <div>
        <div id="header">
          {game? <a href="/"  >Home</a> : <div></div>}
          <h1>Where's Waldo</h1>
          {open ? (
            game ? <div className="timer">
              <div>{formatTime(time)}</div>
              <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
              </IconButton>
            </div> : <div></div>
          ) : (
            game ? <div className="timer">
              <div className="hidden">timer</div>
              <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
              </IconButton>
            </div> : <div></div>
          )}
        </div>
        <Outlet context = {[game,setGame, time]}/>
      </div>
      <footer>
        <div>Made with ❤️ by David Bottenberg</div>
        <a href="https://github.com/davebott-dev">
          <GitHubIcon />
        </a>
      </footer>
    </div>
  );
}

export default Root;