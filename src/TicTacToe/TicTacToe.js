import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './TicTacToe.css';

const cloneTable = table => table.map(row => row.slice());

const translatePieces = (piece) => {
  switch (piece) {
    case 2:
      return 'O';
    case 1:
      return 'X';
    default:
      return '';
  }
};

const TicTacToeRow = ({row, rowIndex, placePiece}) => {
  return (
    <div className="row" key={rowIndex}>
      {row.map((col, j) => {
        return (
          <div key={j} className="col align-items-center TicTacToe-item" onClick={() => placePiece(rowIndex, j)}>
            {translatePieces(col)}
          </div>
        );
      })}
    </div>
  );
};
const EMPTY_BOARD = Array(3).fill(Array(3).fill(0));
class TicTacToe extends Component {
  constructor() {
    super();
    this.state = {
      board: EMPTY_BOARD,
      turn: 0,
      victoryPlayer: null
    };

    this.placePiece = this.placePiece.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.gameState = this.gameState.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.victoryCheck = this.victoryCheck.bind(this);
    this.victoryReturn = this.victoryReturn.bind(this);
  }

  componentDidMount() {
    window.placePiece = this.placePiece;
  }

  gameState() {
    for(var playerValue = 1; playerValue <=2;playerValue++){
      if (this.state.board[0][0] === playerValue && this.state.board[0][1] === playerValue && this.state.board[0][2] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[1][0] === playerValue && this.state.board[1][1] === playerValue && this.state.board[1][2] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[2][0] === playerValue && this.state.board[2][1] === playerValue && this.state.board[2][2] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[0][0] === playerValue && this.state.board[1][0] === playerValue && this.state.board[2][0] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[0][1] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][1] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[0][2] === playerValue && this.state.board[1][2] === playerValue && this.state.board[2][2] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[0][0] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][2] === playerValue) {
        this.victoryCheck(playerValue);
      } else if (this.state.board[0][2] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][0] === playerValue) {
        this.victoryCheck(playerValue);
      }
    }
  }

  placePiece(i, j) {
    const placement = this.state.turn + 1;
    const newBoard = cloneTable(this.state.board);

    if (newBoard[i][j] !== 0) {
      return;
    }
    newBoard[i][j] = placement;
    this.setState({
      board: newBoard,
      turn: (this.state.turn === 0
        ? 1
        : 0)
    }, function() {
      this.gameState();
    });
  }

  renderRow(row, i) {
    return (<TicTacToeRow key={i} row={row} rowIndex={i} placePiece={this.placePiece}/>);
  }

  renderModal() {
    window.$(ReactDOM.findDOMNode(this).querySelector('.modal')).modal();
  }

  renderButton(){
    return(<button onClick={this.clearBoard}>
      Clear Board
    </button>);
  }

  clearBoard(){
    this.setState({
      board: EMPTY_BOARD,
      turn: (this.state.turn === 0
        ? 1
        : 0)
    });
  }

  victoryCheck(playerValue){
    this.setState({victoryPlayer: playerValue});
  }

  victoryReturn(){
    if(this.state.victoryPlayer !== null){
      var gameEnd = this.state.victoryPlayer;
      this.setState({
        victoryPlayer: null
      }
    );
      return (
        <p>Player {gameEnd} has won!</p>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container TicTacToe">
          {this.state.board.map(this.renderRow)}
        </div>
        <div className="container clear-button">
          <button className="btn btn-primary" onClick={this.clearBoard}>
            Clear Board
          </button>
        </div>
        <div className="victory-return">
            {this.victoryReturn()}
        </div>
      </div>

    );
  }
}

export default TicTacToe;
