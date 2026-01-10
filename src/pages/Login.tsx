import { useState } from 'react';
import { Button, Container, TextField, Stack, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [x,setX]=useState('');
  const [o,setO]=useState('');
  const nav=useNavigate();

  return (
    <Container maxWidth="sm">
      <Stack spacing={3} mt={10}>
        <Typography variant="h4" align="center">Tic-Tac-Toe 5 in a Row</Typography>
        <TextField label="Player X" value={x} onChange={e=>setX(e.target.value)} />
        <TextField label="Player O" value={o} onChange={e=>setO(e.target.value)} />
        <Button variant="contained" disabled={!x||!o}
          onClick={()=>nav('/game',{state:{x,o}})}>Start</Button>
        <Box display="flex" gap={2} justifyContent="center" mt={2}>
          <Button component={Link} to="/history" variant="outlined">History</Button>
          <Button component={Link} to="/stats" variant="outlined">Stats</Button>
        </Box>
      </Stack>
    </Container>
  );
}