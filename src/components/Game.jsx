import React, { Component } from 'react';
import Board from './Board';
import { calculateWinner } from '../modules/Winner';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          calc: {
            row: i % 3,
            col: Math.floor(i / 3)
          }
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const NotWinner = !winner && !current.squares.includes(null);

    const moves = history.map((step, move) => {
      const iscurrect = this.state.stepNumber === move;
      const desc = move
        ? `Go to move # ${move} (${step.calc.row}, ${step.calc.col})`
        : `Go to game start `;

      return (
        <li className="nav-item " key={move}>
          <span
            className={`nav-link ${iscurrect ? 'active' : ''}`}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (NotWinner) {
      status = 'dorw';
    } else {
      status = 'Next: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <article className="game container mt-5">
        <section className="row">
          <div className="col-sm-8 game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="col-sm-4 game-info">
            <p className="h2 ">{status}</p>
            <ul className="nav nav-pills flex-column">{moves}</ul>
          </div>
        </section>
      </article>
    );
  }
}

export default Game;
