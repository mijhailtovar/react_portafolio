import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({value, onSquareClick}){
  return (
      <button className="square" onClick={onSquareClick} >
        {value} 
      </button>
  )
}

function Board({xIsNext, squares, onPlay}) {
  // const[xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    //si el cuadrado ya esta lleno con una 'x' o una 'o'
    // o si ya alguien gano
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    }else{
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  //si ya se decidio el ganador o no, se decidira cual mensage poner
  // mostrando en turno o el ganador
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }else{
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'> {status} </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game(){
  const[history, setHistory] = useState([Array(9).fill(null)]);
  // el movimiento en el cual esta el jugador actualmente
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  //lee el ultimo movimiento en el array de estados
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  //convierte un array en otro array mediante la funcion map
  // que contiene una funcion anonima que realiza operaciones sobre el array
  // squares
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ve al movimiento #' + move;
    }else{
      description = 'Ve al comienzo del juego';      
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} > {description} </button>
      </li>
    );
  });

  return(
    <div className='game' >
      <div className='game-board' >
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info' >
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];      
    }
  }
  return null;
}

