export default function NumOfPlayers({ handlePlayers }) {
  return (
    <div id="game-over">
      <h1>Select no. of players</h1>
      <p>
        <button onClick={() => handlePlayers(1)}>1</button>
      </p>
      <p>
        <button onClick={() => handlePlayers(2)}>2</button>
      </p>
    </div>
  );
}
