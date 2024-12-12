import {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';

const Leaderboard =() => {
    const [game, setGame, time] = useOutletContext();

    const formatTime = (s) => {
        const minutes = Math.floor(s / 60);
        const sec = s % 60;
        return `${minutes.toString().padStart(2, "0")}: ${sec
          .toString()
          .padStart(2, "0")}`;
      };

      useEffect(()=> {
        //useEffect to fetch gb leaderboard data for the board just played and display it
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