export default function GameOver({ winner,onRematch }) {
  return (
    <div id="game-over">
      <h2>Game Overr</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p> Match Drawn</p>}
      <p>
        <button onClick = {onRematch}>Rematch</button>
      </p>
    </div>
  );
}
