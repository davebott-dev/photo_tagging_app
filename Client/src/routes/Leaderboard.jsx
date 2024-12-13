import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function Leaderboard({ time }) {
  const { gbId } = useParams();
  const [scores,setScores] =useState();

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const sec = s % 60;
    return `${minutes.toString().padStart(2, "0")}: ${sec
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/game/leaderboard/"+gbId);
      const data = await response.json();
      console.log(data);
      setScores(data);
    };
    fetchData();
  },[gbId]);


  return (
    <div id="leaderboard">
      <h1>Leaderboard</h1>
      {scores.leaderboard.map((score,index)=> {
        return (
          <div key ={index}>hello</div>
        )
      })}
      <button>Return Home</button>
    </div>
  )
}
//render the leaderboard
export default Leaderboard;
