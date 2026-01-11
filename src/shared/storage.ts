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
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading matches from localStorage:', error);
    try {
      localStorage.removeItem(KEY);
    } catch (err) {
      console.error('Error!', err);
    }
    return [];
  }
}

export function saveMatch(match: Match) {
  try {
    const all = loadMatches();
    if (!Array.isArray(all)) {
      localStorage.setItem(KEY, JSON.stringify([match]));
      return;
    }
    all.push(match);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch (error) {
    console.error('Error saving match to localStorage:', error);
    try {
      localStorage.setItem(KEY, JSON.stringify([match]));
    } catch (e) {
      console.error('Failed to save match:', e);
    }
  }
}