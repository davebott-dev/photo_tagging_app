import { useState } from "react";
import "./App.css";

function Gameboard() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div id="indexContainer">
      <img
        src="https://where-is-waldo-kc.netlify.app/assets/waldo-1-CnK-GoU-.webp"
        alt="a very crowded beach"
        onClick={(e)=>console.log(e.clientX, e.clientY)}
      ></img>
      {open && (
        <div id="popup">
          <p>Select a Character</p>
          <div>
            <img
              src="https://www.giantbomb.com/a/uploads/scale_small/4/46311/1333591-200px_character.odlaw.jpg"
              alt="image of odlaw"
            />
            <img
              src="https://www.giantbomb.com/a/uploads/scale_small/0/5973/545186-waldo2.jpg"
              alt="image of waldo"
            />
            <img
              src="https://www.giantbomb.com/a/uploads/scale_small/4/46311/1341868-wizard.gif"
              alt="image of wizard whitebeard"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Gameboard;