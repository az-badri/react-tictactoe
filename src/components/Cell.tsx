import { Box } from '@mui/material';
import type { Player } from '../types/game';

type CellProps = {
    value?: Player;
    isWin?: boolean;
    onClick: () => void;
};

export function Cell({ value, isWin, onClick }: CellProps) {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: { xs: 48, sm: 64 },
                height: { xs: 48, sm: 64 },
                borderRadius: 2,
                bgcolor: isWin ? 'warning.light' : 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                cursor: value ? 'default' : 'pointer',
                boxShadow: 2,
                userSelect: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                    bgcolor: value ? undefined : 'grey.200',
                },
            }}
        >
            {value}
        </Box>
    );
}
