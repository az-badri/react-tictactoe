import { useState } from 'react';
import { Button, Container, TextField, Stack, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [players, setPlayers] = useState({ x: '', o: '' });
  const navigate = useNavigate();

  const handleChange = (player: 'x' | 'o') => (e: React.ChangeEvent<HTMLInputElement>) =>
      setPlayers(prev => ({ ...prev, [player]: e.target.value }));

  const isStartDisabled = !players.x.trim() || !players.o.trim();

  return (
      <Container maxWidth="sm">
        <Stack spacing={3} mt={10} alignItems="center">
          <Typography variant="h4">Tic-Tac-Toe 5 in a Row</Typography>
          <TextField label="Player X" value={players.x} onChange={handleChange('x')} fullWidth />
          <TextField label="Player O" value={players.o} onChange={handleChange('o')} fullWidth />
          <Button
              variant="contained"
              disabled={isStartDisabled}
              onClick={() => navigate('/game', { state: players })}
              fullWidth
          >
            Start
          </Button>
          <Box display="flex" gap={2} mt={2}>
            <Button component={Link} to="/history" variant="outlined" fullWidth>
              History
            </Button>
            <Button component={Link} to="/stats" variant="outlined" fullWidth>
              Stats
            </Button>
          </Box>
        </Stack>
      </Container>
  );
}

export default Login;