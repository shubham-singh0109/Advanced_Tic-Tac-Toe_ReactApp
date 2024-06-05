import React, { useState } from 'react';
import './TicTacToe.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [playerXWins, setPlayerXWins] = useState(0);
    const [playerOWins, setPlayerOWins] = useState(0);

    const handleClick = (index) => {
        if (winner) return;

        if (board[index] === null) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            checkForWinner();
        }
    }

    const checkForWinner = () => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                updateWinCount(board[a]);
                return;
            }
        }

        if (board.every(cell => cell !== null)) {
            setWinner('tie');
        }
    }

    const updateWinCount = (winner) => {
        if (winner === 'X') {
            setPlayerXWins(playerXWins + 1);
        } else if (winner === 'O') {
            setPlayerOWins(playerOWins + 1);
        }
    }

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    }

    return (
        <div>
        
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Tic Tac Toe
                        </Typography>
                        <Box sx={{ flexGrow: 7, display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h4">Enjoy your Time!</Typography>
                        </Box>
                        <Button color="inherit">Statistics</Button>
                        <Button color="inherit">Players</Button>
                        <Button color="inherit">Rewards</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        
        <div className='background'></div>

        <div className="tic-tac-toe">
            <div className="board">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
                </div>
            <div className="status">
                {winner ? 
                    (winner === 'tie' ? 'It\'s a tie!' : `Winner: ${winner}`) :
                    `Current player: ${currentPlayer}`
                }
            </div>
            </div>
            
        </div>
    );
}

export default TicTacToe;