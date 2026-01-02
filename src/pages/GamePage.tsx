import { useState } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { Board } from '../components/Board';
import { useGame } from '../hooks/useGame';
import { checkWinner } from '../hooks/useWinnerCheck';

export function GamePage() {
    const { moves, currentPlayer, winner, setWinner, makeMove, resetGame } =
        useGame();

    const [winLine, setWinLine] = useState<{ x: number; y: number }[]>();

    const handleMove = (x: number, y: number) => {
        makeMove(x, y);

        const result = checkWinner(moves, x, y, currentPlayer);
        if (result) {
            setWinner(result.winner);
            setWinLine(result.line);
        }
    };

    return (
        <Stack spacing={2} alignItems="center">
            <Alert severity={winner ? 'success' : 'info'}>
                {winner ? `Победил ${winner}` : `Ход игрока ${currentPlayer}`}
            </Alert>

            <Board moves={moves} onMove={handleMove} winLine={winLine} />

            <Button variant="contained" color="success" onClick={resetGame}>
                Заново
            </Button>
        </Stack>
    );
}
