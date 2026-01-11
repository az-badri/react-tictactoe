import { useMemo } from 'react';
import { loadMatches } from '../shared/storage';
import { Button, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const History = () => {
    const matches = useMemo(() => loadMatches(), []);

    const formattedMatches = useMemo(() => {
        if (!Array.isArray(matches)) return [];
        return matches
            .filter(match => match?.id)
            .map(({ id, playerX, playerO, winner }) => {
                const pX = playerX || 'Unknown';
                const pO = playerO || 'Unknown';
                const winnerName =
                    winner === 'X' ? pX : winner === 'O' ? pO : 'Unknown';
                return { id, pX, pO, winnerName };
            });
    }, [matches]);

    const isEmpty = formattedMatches.length === 0;

    return (
        <Box p={5}>
            <Typography variant="h5" component="h2" gutterBottom>
                History
            </Typography>

            {isEmpty ? (
                <Typography color="text.secondary">No matches found.</Typography>
            ) : (
                formattedMatches.map(({ id, pX, pO, winnerName }) => (
                    <Typography key={id} sx={{ mb: 1 }}>
                        {pX} vs {pO} — winner: {winnerName}
                    </Typography>
                ))
            )}

            <Stack direction="row" spacing={2} mt={3}>
                <Button component={Link} to="/login" variant="contained">
                    New Game
                </Button>
                <Button component={Link} to="/stats" variant="outlined">
                    Stats
                </Button>
            </Stack>
        </Box>
    );
};