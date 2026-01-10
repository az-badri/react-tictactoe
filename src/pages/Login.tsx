import { useState } from 'react';
import { Button, Container, TextField, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      </Stack>
    </Container>
  );
}