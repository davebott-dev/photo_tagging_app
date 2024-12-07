import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

function Root() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div id ="rootContainer">
      <div>
        <div id="header">
          <Link>Home</Link>
          <h1>Where's Waldo</h1>
          {open ? (
            <div className="timer">
                <div>timer</div>
                <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
                        </IconButton>
            </div>
          ) : (
            <div className = "timer">
                <div className="hidden">timer</div>
                <IconButton color="primary" onClick={handleOpen}>
                <WatchLaterIcon />
                        </IconButton>
            </div>
          )}
        </div>
        <Outlet  />
      </div>
      <footer>
          <div>Made with ❤️ by David Bottenberg</div>
          <a href="https://github.com/davebott-dev"><GitHubIcon/></a>
        </footer>
    </div>
  );
}

export default Root;

//handle timer function--start once user submits form
//code game logic...if user clicks correct spot remove img from list and bring popup down