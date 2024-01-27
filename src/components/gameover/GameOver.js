export default function GameOver({winner,handleRestart}){
    return(
        <div id="game-over">
         <h1>Game Over</h1>
         {winner && <p>{winner} you won!</p>}
         {!winner && <p>Its a Draw</p>}
         <p>
            <button onClick={handleRestart}>Rematch</button>
         </p>
        </div>
    )
}