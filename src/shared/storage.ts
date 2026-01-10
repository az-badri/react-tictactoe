const KEY = 'ttt-matches';

export type Match = {
  id: string;
  date: string;
  playerX: string;
  playerO: string;
  winner: 'X' | 'O';
  board: Record<string, 'X' | 'O'>;
};

export function loadMatches(): Match[] {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveMatch(match: Match) {
  const all = loadMatches();
  all.push(match);
  localStorage.setItem(KEY, JSON.stringify(all));
}