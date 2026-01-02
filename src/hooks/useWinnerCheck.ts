import type { BoardState, Player } from '../types/game';

const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
];

export const checkWinner = (
    moves: BoardState,
    x: number,
    y: number,
    player: Player
): { winner: Player; line: { x: number; y: number }[] } | null => {
    for (const [dx, dy] of directions) {
        const line = [{ x, y }];

        for (let i = 1; i < 5; i++) {
            const key = `${x + dx * i}:${y + dy * i}`;
            if (moves[key] === player) {
                line.push({ x: x + dx * i, y: y + dy * i });
            } else break;
        }

        for (let i = 1; i < 5; i++) {
            const key = `${x - dx * i}:${y - dy * i}`;
            if (moves[key] === player) {
                line.unshift({ x: x - dx * i, y: y - dy * i });
            } else break;
        }

        if (line.length >= 5) {
            return { winner: player, line };
        }
    }

    return null;
}
