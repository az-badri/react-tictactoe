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

                // Цвет фона
                bgcolor: isWin ? 'warning.light' : 'grey.100',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: 32,
                fontWeight: 700,
                userSelect: 'none',

                cursor: value ? 'default' : 'pointer',
                boxShadow: 2,

                animation: value ? 'scaleIn 0.15s ease-out' : 'none',

                '@keyframes scaleIn': {
                    from: {
                        transform: 'scale(0)',
                        opacity: 0,
                    },
                    to: {
                        transform: 'scale(1)',
                        opacity: 1,
                    },
                },

                transition: 'background-color 0.2s',
                '&:hover': {
                    bgcolor: value ? undefined : 'grey.200',
                },
            }}
        >
            {value}
        </Box>
    );
}
