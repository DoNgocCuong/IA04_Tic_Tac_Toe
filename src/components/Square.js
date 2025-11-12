import React from 'react';

export default function Square({ value, onClick, highlight }) {
    const className = highlight ? 'square highlight' : 'square';
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
}
