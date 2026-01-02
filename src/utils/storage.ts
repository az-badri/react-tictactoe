import { Match } from '../types/game';

const MATCHES_KEY = 'matches';

export function getMatches(): Match[] {
    return JSON.parse(localStorage.getItem(MATCHES_KEY) || '[]');
}

export function saveMatch(match: Match) {
    const matches = getMatches();
    matches.push(match);
    localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
}
