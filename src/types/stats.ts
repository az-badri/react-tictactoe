export type PlayerStats = {
    wins: number;
    losses: number;
    draws: number;
};

export type StatsMap = Record<string, PlayerStats>;
