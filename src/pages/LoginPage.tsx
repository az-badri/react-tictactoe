import { Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePlayers } from '../context/PlayersContext';

export function LoginPage() {
    const [x, setX] = useState('');
    const [o, setO] = useState('');
    const { setPlayers } = usePlayers();
    const navigate = useNavigate();

    const startGame = () => {
        if (!x || !o) return;
        setPlayers(x, o);
        navigate('/game');
    };

    return (
        <Stack spacing={2} maxWidth={300} mx="auto">
            <Typography variant="h5" align="center">
                Введите игроков
            </Typography>

            <TextField label="Игрок X" value={x} onChange={e => setX(e.target.value)} />
            <TextField label="Игрок O" value={o} onChange={e => setO(e.target.value)} />

            <Button variant="contained" onClick={startGame}>
                Начать игру
            </Button>
        </Stack>
    );
}
