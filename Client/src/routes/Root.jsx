import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

function Root() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setRunning((prev) => !prev);

    if (!open) {
      setTime(0);
    }
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
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div id="rootContainer">
      <div>
        <div id="header">
          <Link>Home</Link>
          <h1>Where's Waldo</h1>
          {open ? (
            <div className="timer">
              <div>{formatTime(time)}</div>
              <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
              </IconButton>
            </div>
          ) : (
            <div className="timer">
              <div className="hidden">timer</div>
              <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
              </IconButton>
            </div>
          )}
        </div>
        <Outlet />
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

//timer automatically starts when the game is started...can open and close view 