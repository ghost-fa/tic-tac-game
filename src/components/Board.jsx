import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  render() {
    const { squares, onClick } = this.props;

    return (
      <div className="board">
        {squares.map((square, i) => (
          <Square value={squares[i]} key={i} onClick={() => onClick(i)} />
        ))}
      </div>
    );
  }
}

export default Board;
