import Negyzet from "../negyzet/Negyzet";
import React, { useEffect, useState } from 'react';
import "./Jatekter.css";

function Jatekter() {
    const Game_State={
        Run:"Jatekos jön",
        Won:"Játékos Nyert",
        Def:"Játékos Végső lépésének köszönhetően Döntetlen"
    }
    const [board, setboard] = useState(Array(9).fill(""))
    const [winners, setwinners] = useState(Array(3).fill(null))
    const [player, setplayer] = useState('X')
    const [Game, setGame] = useState(Game_State.Run)
   
    const katt = (index)=>
    {
        if (board[index]) return;
        const newboard=[...board]
     
        newboard[index]= player;
        setboard(newboard)
        setplayer(player === 'X' ? 'O':'X')
       

    }
    useEffect(() => {
        const nyertesInfo = ellenorizNyertest(board);
        if (nyertesInfo) {
          setplayer(nyertesInfo.WPlayer);
          setGame(Game_State.Won);
          setwinners(nyertesInfo.Indexek); // Frissíti a nyertes indexeket
        } else if (board.every(cell => cell !== "")) {
          setGame(Game_State.Def);
        } else {
          setGame(Game_State.Run);
        }
      }, [board]);
        function ellenorizNyertest(board) {
            const nyeroSorok = [
                [0, 1, 2], // 1. sor
                [3, 4, 5], // 2. sor
                [6, 7, 8], // 3. sor
                [0, 3, 6], // 1. oszlop
                [1, 4, 7], // 2. oszlop
                [2, 5, 8], // 3. oszlop
                [0, 4, 8], // bal felsőtől jobb alsóig átló
                [2, 4, 6], // jobb felsőtől bal alsóig átló
            ];
        
            for (let i = 0; i < nyeroSorok.length; i++) {
                const [a, b, c] = nyeroSorok[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return {WPlayer:board[a],Indexek:nyeroSorok[i]};
                }
            }
        
            return null;
        }

  return (
    <div className="Jatek">
    <h3>Tic-Tac-Toe</h3>
    <div className="Jatekter">
      {board.map((elem, i) => (
        <Negyzet  key={i} index={i} katt={katt} value={elem} gamestate={Game} winners={winners}/>
      ))}
      </div>
      <h3>{player+" "+Game}</h3>
    </div>
  );
}

export default Jatekter;
