import { useState } from 'react';
import type { BoardState, Player } from '../types/game';

export function useGame() {
    const [moves, setMoves] = useState<BoardState>({});
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [winner, setWinner] = useState<Player | null>(null);

    const makeMove = (x: number, y: number) => {
        const key = `${x}:${y}`;
        if (moves[key] || winner) return;

        setMoves(prev => ({
            ...prev,
            [key]: currentPlayer,
        }));

        setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    };

    const resetGame = () => {
        setMoves({});
        setCurrentPlayer('X');
        setWinner(null);
    };

    return {
        moves,
        currentPlayer,
        winner,
        setWinner,
        makeMove,
        resetGame,
    };
}
