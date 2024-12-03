import {useState} from 'react';
import "./App.css";

function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    open ? setOpen(false): setOpen(true);
  }

  return (
    <div>
      <img
        src="https://where-is-waldo-kc.netlify.app/assets/waldo-1-CnK-GoU-.webp"
        alt="a very crowded beach"
        onClick= {handleClick}
      ></img>
      {open && <div>
        Hello World
      </div>}
    </div>
  );
}

export default Index;
