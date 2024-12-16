import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function Leaderboard() {
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
    scores ? <div id="leaderboard">
      <div>
        <h1>Leaderboard</h1>
        <h2>Map: {scores.leaderboard[0].gameboard.name}</h2>
        {scores.leaderboard.map((score,index)=> {
          return (
            <div key ={index} className = "scores">
              <div>{score.user.username}</div>
              <div>{score.time}</div>
            </div>
          )
        })}
      </div>
      <a href="/"><button id="leaderboard-btn">Return Home</button></a>
    </div> : <p>loading</p>
  ) 
}
export default Leaderboard;

