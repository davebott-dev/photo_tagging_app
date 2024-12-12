import {useState, useEffect} from 'react';
import "../App.css";


function Leaderboard() {
    const formatTime = (s) => {
        const minutes = Math.floor(s / 60);
        const sec = s % 60;
        return `${minutes.toString().padStart(2, "0")}: ${sec
          .toString()
          .padStart(2, "0")}`;
      };

      useEffect(()=> {
        const fetchData = async () => {
          const response = await fetch("/api/game/leaderboard");
          const data = await response.json();
          console.log(data);
        };
        fetchData();      
      })

      console.log(game)
      console.log(time)


    return (

        <div>Hello World</div>
    )//format how it will look and give the option to return to homepage.
    //make game playable on various screens
    //done after this and deploy project
}

export default Leaderboard;