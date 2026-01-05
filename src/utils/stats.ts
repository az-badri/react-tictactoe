import type { Player } from '../types/game';
import type { StatsMap } from '../types/stats';

const KEY = 'stats';

export function getStats(): StatsMap {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
}

export function updateStats(
    playerX: string,
    playerO: string,
    winner: Player | null
) {
    const stats = getStats();

    [playerX, playerO].forEach(p => {
        if (!stats[p]) {
            stats[p] = { wins: 0, losses: 0, draws: 0 };
        }
    });

    if (!winner) {
        stats[playerX].draws++;
        stats[playerO].draws++;
    } else if (winner === 'X') {
        stats[playerX].wins++;
        stats[playerO].losses++;
    } else {
        stats[playerO].wins++;
        stats[playerX].losses++;
    }

    localStorage.setItem(KEY, JSON.stringify(stats));
}
