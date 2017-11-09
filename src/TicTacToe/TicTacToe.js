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


const VictoryModal = () => (
    <div id="potato" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Victory!</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">New Game?</button>
          </div>
        </div>
      </div>
    </div>);
// const modalInstance = (
//   <div className="static-modal">
//     <Modal.Dialog>
//       <Modal.Header>
//         <Modal.Title>Modal title</Modal.Title>
//       </Modal.Header>
//
//       <Modal.Body>
//         One fine body...
//       </Modal.Body>
//
//       <Modal.Footer>
//         <Button>Close</Button>
//         <Button bsStyle="primary">Save changes</Button>
//       </Modal.Footer>
//
//     </Modal.Dialog>
//   </div>
// );


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

class TicTacToe extends Component {
  constructor() {
    super();
    this.state = {
      board: Array(3).fill(Array(3).fill(0)),
      turn: 0
    };

    this.placePiece = this.placePiece.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.gameState = this.gameState.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentDidMount() {
    window.placePiece = this.placePiece;
  }

  gameState() {

    for(var playerValue = 1; playerValue <=2;playerValue++){
      if (this.state.board[0][0] === playerValue && this.state.board[0][1] === playerValue && this.state.board[0][2] === playerValue) {
        console.log('e1');
        this.renderModal();
      } else if (this.state.board[1][0] === playerValue && this.state.board[1][1] === playerValue && this.state.board[1][2] === playerValue) {
        console.log('e2');
        this.renderModal();
      } else if (this.state.board[2][0] === playerValue && this.state.board[2][1] === playerValue && this.state.board[2][2] === playerValue) {
        console.log('e3');
        this.renderModal(); // Rows End
      } else if (this.state.board[0][0] === playerValue && this.state.board[1][0] === playerValue && this.state.board[2][0] === playerValue) {
        console.log('e4');
        this.renderModal();
      } else if (this.state.board[0][1] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][1] === playerValue) {
        console.log('e5');
        this.renderModal();
      } else if (this.state.board[0][2] === playerValue && this.state.board[1][2] === playerValue && this.state.board[2][2] === playerValue) {
        console.log('e6');
        this.renderModal(); // Columns End
      } else if (this.state.board[0][0] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][2] === playerValue) {
        console.log('e7');
        this.renderModal();
      } else if (this.state.board[0][2] === playerValue && this.state.board[1][1] === playerValue && this.state.board[2][0] === playerValue) {
        console.log('e8');
        this.renderModal();
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


  render() {
    return (
      <div className="container TicTacToe">
        {this.state.board.map(this.renderRow)}
        <VictoryModal />
      </div>
    );
  }
}

export default TicTacToe;
