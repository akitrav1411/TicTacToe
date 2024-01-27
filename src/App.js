import { useState } from "react";
import { GameBoard, GameOver, Player, Log, NumofPlayers } from "./components";
import { WINNING_COMBINATIONS } from "./utilities/winning-combinations";

const PLAYERS = {
  X: "Player1",
  O: "Player2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(turns, playerName) {
  let activePlayer = {
    name: playerName.X,
    symbol: "X",
  };
  if (turns.length > 0 && turns[0].player.name === playerName.X)
    activePlayer = { name: playerName.O, symbol: "O" };
  return activePlayer;
}

function deriveWinner(gameBoard, playerName) {
  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
}
function computerTurn(gameTurns, gameBoard) {
  let row = Math.floor(Math.random() * gameBoard.length);
  let col = Math.floor(Math.random() * gameBoard.length);
  while (gameBoard[row][col] !== null) {
    row = Math.floor(Math.random() * gameBoard.length);
    col = Math.floor(Math.random() * gameBoard.length);
  }
  return { row, col };
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [numofplayers, setNumofplayers] = useState();
  const activePlayer = deriveActivePlayer(gameTurns, playerName);
  const gameBoard = deriveGameBoard(gameTurns, numofplayers);
  const winner = deriveWinner(gameBoard, playerName);
  function handleNameChange(symbol, name) {
    setPlayerName((prevname) => {
      return {
        ...prevname,
        [symbol]: name,
      };
    });
  }

  function deriveGameBoard(gameTurns, numofplayers) {
    const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (let turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player.symbol;
    }
    if (
      numofplayers === 1 &&
      gameTurns.length &&
      gameTurns[0].player.symbol === "X"
    ) {
      //  gameBoard[chance.row][chance.col]='O';
      let hasEmptySlot = false;
      for (let row of gameBoard) {
        if (row.includes(null)) {
          hasEmptySlot = true;
          break;
        }
      }
      if (hasEmptySlot) {
        const chance = computerTurn(gameTurns, gameBoard);
        handleSelectSquare(chance.row, chance.col);
      }
    }
    return gameBoard;
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns, playerName);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    setNumofplayers();
  }
  function handlePlayers(val) {
    setNumofplayers(val);
  }
  return (
    <>
      {!numofplayers ? (
        <NumofPlayers handlePlayers={handlePlayers} />
      ) : (
        <main>
          <div id="game-container">
            <ol id="players" className="highlight-player">
              <Player
                name={playerName.X}
                symbol="X"
                isActive={activePlayer.symbol === "X"}
                onChangeName={handleNameChange}
              />
              {numofplayers === 2 && (
                <Player
                  name={playerName.O}
                  symbol="O"
                  isActive={activePlayer.symbol === "O"}
                  onChangeName={handleNameChange}
                />
              )}
            </ol>
            {(winner || hasDraw) && (
              <GameOver winner={winner} handleRestart={handleRestart} />
            )}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
          </div>
          <Log turns={gameTurns} />
        </main>
      )}
    </>
  );
}

export default App;
