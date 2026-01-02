export type Player = 'X' | 'O';

export type BoardState = Record<string, Player>;

export type Match = {
    id: string;
    playerX: string;
    playerO: string;
    winner: Player | null;
    date: string;
    moves: BoardState;
    winLine?: { x: number; y: number }[];
};
