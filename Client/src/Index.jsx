import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "./App.css";

function Index() {
  const [maps, setMaps] = useState([]);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setMaps(data);
    };
    fetchData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;

    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, selected }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          navigate("/game/" + data.data.id);
        } else {
          console.log('snackbar open');
          setOpen(true);
        }
      } else {
        console.error("Username already selected");
        setOpen(true)
      }
    } catch (err) {
      console.error("submission failed", err);
      setOpen(true);
    }
  };
  return (
    <div id="indexContainer">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter a username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <span>Choose a map:</span>
          {maps.map((map, index) => {
            return (
              <div key={index} className="mapSelection">
                <div>
                  <input
                    type="radio"
                    id={`choice-${index}`}
                    name="map"
                    value={map.name}
                    checked={selected === map.name}
                    onChange={handleChange}
                  />
                  <label htmlFor={`choice-${index}`}>{map.name}</label>
                </div>
                <img
                  src={map.imgURL}
                  alt={`map selection ${index}`}
                  height={300}
                />
              </div>
            );
          })}
        </div>
        <button>Submit</button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" variant="filled">
            {" "}
            Username Already Taken
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}

export default Index;

