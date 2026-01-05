import { Card, CardContent, Stack, Typography } from '@mui/material';
import { getStats } from '../utils/stats';

export function StatsPage() {
    const stats = getStats();

    return (
        <Stack spacing={2}>
            {Object.entries(stats).map(([name, stat]) => (
                <Card key={name}>
                    <CardContent>
                        <Typography fontWeight={700}>{name}</Typography>
                        <Typography>Победы: {stat.wins}</Typography>
                        <Typography>Поражения: {stat.losses}</Typography>
                        <Typography>Ничьи: {stat.draws}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
