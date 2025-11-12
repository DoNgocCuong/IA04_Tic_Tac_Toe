import React from 'react';
import Square from './Square';

export default function Board({ squares, onPlay, winningLine = [] }) {
    const size = 3;

    function renderSquare(i) {
        const highlight = winningLine.includes(i);
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onPlay(i)}
                highlight={highlight}
            />
        );
    }

    const boardRows = [];
    for (let row = 0; row < size; row++) {
        const rowSquares = [];
        for (let col = 0; col < size; col++) {
            const index = row * size + col;
            rowSquares.push(renderSquare(index));
        }
        boardRows.push(
            <div className="board-row" key={row}>
                {rowSquares}
            </div>
        );
    }

    return <div>{boardRows}</div>;
}
