import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    setWinningSquares(winner || []);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }

    return null;
  }

  function resetGame() {
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Winner: ' + squares[winner[0]];
  } else if (squares.every((square) => square !== null)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const[mode,setMode]=useState('dark');
  const toggleTheme =()=>{
    if(mode === 'light')
    {
      setMode('dark')
      document.body.style.backgroundColor='white'
      document.querySelector(".status").style.color='black';
    }
    else
    {
      setMode('light')
      document.body.style.backgroundColor='black'
      document.querySelector(".status").style.color='white';
      // document.querySelector(".square").style.backgroundColor='pink'
    }
  }

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinning={winningSquares.includes(index)}
          />
        ))}
      </div>
      <div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div>
        <button className='theme-button' onClick={toggleTheme}>
            {mode + ' Mode'}
        </button>
      </div>
    </div>
  );
}

export default Board;
