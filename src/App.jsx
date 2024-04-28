import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/Winning-Combinations";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  
  let activePlayer = deriveActivePlayer(gameTurn);

  let winner =undefined;

  let gameBoard = [...initialGameBoard.map(array=>[...array])];  
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol==thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  const isDraw = gameTurn.length==9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
    }

    function handleRematch(){
      setGameTurn([]);
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner||isDraw)&& <GameOver onRematch={handleRematch} winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
