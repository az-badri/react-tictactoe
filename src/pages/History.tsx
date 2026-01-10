import { loadMatches } from '../shared/storage';
import { Button, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function History(){
  const m=loadMatches();
  if (!Array.isArray(m) || m.length === 0) {
    return (
      <Box p={5}>
        <h2>History</h2>
        <p>No matches found.</p>
        <Stack direction="row" spacing={2} mt={2}>
          <Button component={Link} to="/login" variant="contained">New Game</Button>
          <Button component={Link} to="/stats" variant="outlined">Stats</Button>
        </Stack>
      </Box>
    );
  }
  return (
    <Box p={5}>
      <h2>History</h2>
      {m.map(x=>{
        if (!x || !x.id) return null;
        const winnerName = x.winner === 'X' ? x.playerX : x.winner === 'O' ? x.playerO : 'Unknown';
        return (
          <div key={x.id} style={{marginBottom: 8}}>
            {x.playerX || 'Unknown'} vs {x.playerO || 'Unknown'} — winner {winnerName}
          </div>
        );
      })}
      <Stack direction="row" spacing={2} mt={3}>
        <Button component={Link} to="/login" variant="contained">New Game</Button>
        <Button component={Link} to="/stats" variant="outlined">Stats</Button>
      </Stack>
    </Box>
  );
}