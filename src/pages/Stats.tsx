import React from 'react';
import { loadMatches } from '../shared/storage';
import { Button, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const Stats = () => {
  const matches= loadMatches();
  const stats: Record<string, { w: number, l: number }> = {};

  matches.forEach(x=> {
    // Skip matches without valid data
    if(!x || !x.winner || (x.winner !== 'X' && x.winner !== 'O')) return;
    if(!x.playerX || !x.playerO) return;

    // creating and object with wins and losses to each player
    stats[x.playerX]??={ w: 0, l: 0 };
    stats[x.playerO]??={ w: 0, l: 0 };
    stats[x.winner==='X' ? x.playerX : x.playerO].w++;
    stats[x.winner==='X' ? x.playerO : x.playerX].l++;
  });

  const statsEntries = Object.entries(stats);

    const NavField = () => (
        <Stack direction="row" spacing={2} mt={2}>
            <Button component={Link} to="/login" variant="contained">New Game</Button>
            <Button component={Link} to="/history" variant="outlined">History</Button>
        </Stack>
    )

  if (!Array.isArray(matches) || !statsEntries.length) {
    return (
      <Box p={5}>
        <h2>Stats</h2>
        <p>No stats available yet. Play some games first!</p>
        <NavField />
      </Box>
    );
  }

  return (
    <Box p={5}>
      <h2>Stats</h2>
      {statsEntries.map(([key, value]) => (
        <div key={key} style={{marginBottom: 8}}>{key}: {value.w}W / {value.l}L</div>
      ))}
      <NavField />
    </Box>
  );
}

export default Stats;