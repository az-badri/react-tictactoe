import { loadMatches } from '../shared/storage';
import { Button, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Stats(){
  const m=loadMatches();
  if (!Array.isArray(m)) {
    return (
      <Box p={5}>
        <h2>Stats</h2>
        <p>No stats available.</p>
        <Stack direction="row" spacing={2} mt={2}>
          <Button component={Link} to="/login" variant="contained">New Game</Button>
          <Button component={Link} to="/history" variant="outlined">History</Button>
        </Stack>
      </Box>
    );
  }
  const s:Record<string,{w:number,l:number}>={};
  m.forEach(x=>{
    // Skip matches without valid data
    if(!x || !x.winner || (x.winner !== 'X' && x.winner !== 'O')) return;
    if(!x.playerX || !x.playerO) return;
    
    s[x.playerX]??={w:0,l:0};
    s[x.playerO]??={w:0,l:0};
    s[x.winner==='X'?x.playerX:x.playerO].w++;
    s[x.winner==='X'?x.playerO:x.playerX].l++;
  });

  const statsEntries = Object.entries(s);
  if (statsEntries.length === 0) {
    return (
      <Box p={5}>
        <h2>Stats</h2>
        <p>No stats available yet. Play some games first!</p>
        <Stack direction="row" spacing={2} mt={2}>
          <Button component={Link} to="/login" variant="contained">New Game</Button>
          <Button component={Link} to="/history" variant="outlined">History</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <h2>Stats</h2>
      {statsEntries.map(([k,v])=>(
        <div key={k} style={{marginBottom: 8}}>{k}: {v.w}W / {v.l}L</div>
      ))}
      <Stack direction="row" spacing={2} mt={3}>
        <Button component={Link} to="/login" variant="contained">New Game</Button>
        <Button component={Link} to="/history" variant="outlined">History</Button>
      </Stack>
    </Box>
  );
}