import {Box, Typography, Button, Stack, Alert} from '@mui/material';
import { useLocation, Navigate, useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { checkWinner } from '../shared/checkWinner';
import { saveMatch } from '../shared/storage';

const CELL_SIZE = 40;
const BUFFER = 2;
const MIN_VIEWPORT = 5;

type Player = 'X' | 'O';

export default function Game() {
  const { state } = useLocation() as any;
  const nav = useNavigate();

  const [board, setBoard] = useState<Map<string, Player>>(new Map());
  const [turn, setTurn] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winLine, setWinLine] = useState<string[] | null>(null);

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState(15);

  useEffect(() => {
    const calcViewport = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cellsX = Math.floor(rect.width / CELL_SIZE);
      const cellsY = Math.floor(rect.height / CELL_SIZE);

      setViewport(Math.max(Math.min(cellsX, cellsY), MIN_VIEWPORT));
    };

    calcViewport();
    window.addEventListener('resize', calcViewport);
    return () => window.removeEventListener('resize', calcViewport);
  }, []);

  if (!state?.x || !state?.o) {
    return <Navigate to="/login" />;
  }

  const click = (x: number, y: number) => {
    if (winner) return;

    const key = `${x}:${y}`;
    if (board.has(key)) return;

    const next = new Map(board);
    next.set(key, turn);
    setBoard(next);

    const win = checkWinner(next, x, y, turn);
    if (win) {
      setWinner(turn);
      setWinLine(win);

      saveMatch({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        playerX: state.x,
        playerO: state.o,
        winner: turn,
        board: Object.fromEntries(next)
      });
      return;
    }

    setTurn(t => (t === 'X' ? 'O' : 'X'));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setCamera(c => ({ x: c.x + dx, y: c.y + dy }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragStart.current = null;
  };

  const RENDER = viewport + BUFFER * 2;
  const startX = Math.floor(-camera.x / CELL_SIZE) - BUFFER;
  const startY = Math.floor(-camera.y / CELL_SIZE) - BUFFER;

  return (
      <Box height="100vh" display="flex" flexDirection="column">
        <Box p={2}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography>
                {state.x} (X) vs {state.o} (O)
              </Typography>
              <Typography>
                {winner
                    ? `Winner: ${winner === 'X' ? state.x : state.o}`
                    : `Turn: ${turn === 'X' ? state.x : state.o}`}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button component={Link} to="/history" size="small">History</Button>
              <Button component={Link} to="/stats" size="small">Stats</Button>
              <Button onClick={() => nav('/login')} size="small">New game</Button>
            </Stack>
          </Stack>
        </Box>


        <Box
            ref={containerRef}
            flex={1}
            flexDirection="row-reverse"
            overflow="hidden"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            sx={{ cursor: 'grab', userSelect: 'none' }}
        >
          <Box margin='10px'>
            <Alert severity="info">
              Поле бесконечное, используйте мышь для перемещения по его территории
            </Alert>
          </Box>
          <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${RENDER}, ${CELL_SIZE}px)`,
                placeContent: 'center',
                transform: `translate(
              ${camera.x % CELL_SIZE}px,
              ${camera.y % CELL_SIZE}px
            )`
              }}
          >
            {Array.from({ length: RENDER * RENDER }).map((_, i) => {
              const x = startX + (i % RENDER);
              const y = startY + Math.floor(i / RENDER);
              const key = `${x}:${y}`;

              return (
                  <Box
                      key={key}
                      onClick={() => click(x, y)}
                      sx={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        border: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        background: winLine?.includes(key)
                            ? '#ffe082'
                            : 'transparent'
                      }}
                  >
                    {board.get(key)}
                  </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
  );
}
