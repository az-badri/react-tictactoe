import { Grid } from '@mui/material';
import type { BoardState, Player } from '../types/game';
import { Cell } from './Cell';

type Coords = { x: number; y: number };

type BoardProps = {
    moves: BoardState;
    onMove: (x: number, y: number) => void;
    winLine?: Coords[];
};

const RANGE = 7;

export function Board({ moves, onMove, winLine }: BoardProps) {
    const isWinCell = (x: number, y: number) =>
        winLine?.some(c => c.x === x && c.y === y);

    const getValue = (x: number, y: number): Player | undefined =>
        moves[`${x}:${y}`];

    const cells: JSX.Element[] = [];

    for (let y = RANGE; y >= -RANGE; y--) {
        for (let x = -RANGE; x <= RANGE; x++) {
            cells.push(
                <Grid item key={`${x}:${y}`}>
                    <Cell
                        value={getValue(x, y)}
                        isWin={isWinCell(x, y)}
                        onClick={() => onMove(x, y)}
                    />
                </Grid>
            );
        }
    }

    return (
        <Grid container spacing={1} justifyContent="center">
            {cells}
        </Grid>
    );
}
