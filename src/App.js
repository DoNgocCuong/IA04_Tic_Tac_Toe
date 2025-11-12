import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import calculateWinner from './components/calculateWinner';

export default function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), lastMovePos: null }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const current = history[stepNumber];
  const { winner, line: winningLine } = calculateWinner(current.squares);

  function handleClick(i) {
    if (winner || current.squares[i]) return;

    const historyUpToCurrent = history.slice(0, stepNumber + 1);
    const squares = current.squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(historyUpToCurrent.concat([{ squares, lastMovePos: i }]));
    setStepNumber(historyUpToCurrent.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setStepNumber(move);
    setXIsNext((move % 2) === 0);
  }

  function restartGame() {
    setHistory([{ squares: Array(9).fill(null), lastMovePos: null }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  // ✅ Loại bỏ move = 0 (Start Game)
  const moves = history
    .map((step, move) => {
      if (move === 0) return null; // bỏ nút "Start Game"
      const desc = `Go to move #${move} (${formatLocation(step.lastMovePos)})`;

      if (move === stepNumber) {
        return (
          <li key={move}>
            You are at move #{move} ({formatLocation(step.lastMovePos)})
          </li>
        );
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    })
    .filter(Boolean); // loại bỏ null

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  let status;
  if (winner) status = 'Winner: ' + winner;
  else if (!winner && stepNumber === 9) status = "It's a draw!";
  else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onPlay={handleClick}
          winningLine={winningLine}
        />
      </div>

      <div className="game-info">
        <div className="controls">
          <button onClick={restartGame} className="start-btn">
            Restart Game
          </button>

          <div className="status">{status}</div>

          <button onClick={() => setIsAscending(!isAscending)}>
            Sort {isAscending ? 'Descending' : 'Ascending'}
          </button>
        </div>

        <ol className="moves-list">{sortedMoves}</ol>
      </div>
    </div>
  );
}

function formatLocation(pos) {
  if (pos === null || pos === undefined) return '';
  const row = Math.floor(pos / 3) + 1;
  const col = (pos % 3) + 1;
  return `${row}, ${col}`;
}
