import { Box, Typography, Button, Stack } from '@mui/material';
import { useLocation, Navigate, useNavigate, Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { checkWinner } from '../shared/checkWinner';
import { saveMatch } from '../shared/storage';

const VIEW=15;

export default function Game(){
  const {state}=useLocation() as any;
  const nav=useNavigate();
  const [board,setBoard]=useState(new Map<string,'X'|'O'>());
  const [turn,setTurn]=useState<'X'|'O'>('X');
  const [offset,setOffset]=useState({x:0,y:0});
  const [win,setWin]=useState<string[]|null>(null);
  const [winner,setWinner]=useState<'X'|'O'|null>(null);
  const drag=useRef<{x:number,y:number}|null>(null);

  // Redirect if no state (user navigated directly to /game)
  if(!state || !state.x || !state.o) {
    return <Navigate to="/login" />;
  }

  const click=(x:number,y:number)=>{
    if(win || !state) return;
    const k=`${x}:${y}`;
    if(board.has(k)) return;
    const b=new Map(board); b.set(k,turn);
    const res=checkWinner(b,x,y,turn);
    if(res){
      setWin(res);
      setWinner(turn);
      try {
        saveMatch({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          playerX: state.x || 'Player X',
          playerO: state.o || 'Player O',
          winner: turn,
          board: Object.fromEntries(b)
        });
      } catch (error) {
        console.error('Failed to save match:', error);
      }
      // Don't switch turn after win
      setBoard(b);
      return;
    }
    setBoard(b);
    setTurn(turn==='X'?'O':'X');
  };

  return (
    <Box p={2}
      onMouseDown={e=>drag.current={x:e.clientX,y:e.clientY}}
      onMouseUp={()=>drag.current=null}
      onMouseMove={e=>{
        if(drag.current){
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          setOffset(o=>({
            x:o.x+Math.sign(dx),
            y:o.y+Math.sign(dy)
          }));
          drag.current={x:e.clientX,y:e.clientY};
        }
      }}
    >
      <Stack direction="row" spacing={2} mb={2} alignItems="center" justifyContent="space-between">
        <Box>
          <Typography>{state?.x || 'Player X'} (X) vs {state?.o || 'Player O'} (O)</Typography>
          <Typography>{winner?`Winner: ${winner === 'X' ? (state?.x || 'Player X') : (state?.o || 'Player O')}`:`Turn: ${turn === 'X' ? (state?.x || 'Player X') : (state?.o || 'Player O')}`}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/history" variant="outlined" size="small">History</Button>
          <Button component={Link} to="/stats" variant="outlined" size="small">Stats</Button>
          <Button onClick={()=>nav('/login')} variant="outlined" size="small">New Game</Button>
        </Stack>
      </Stack>

      <Box mt={2} display="grid" gridTemplateColumns={`repeat(${VIEW},40px)`}>
        {Array.from({length:VIEW*VIEW}).map((_,i)=>{
          const x=i%VIEW+offset.x;
          const y=Math.floor(i/VIEW)+offset.y;
          const k=`${x}:${y}`;
          return (
            <Box key={k} onClick={()=>click(x,y)}
              sx={{
                width:40,height:40,border:'1px solid #ccc',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:24,cursor:'pointer',
                background:win?.includes(k)?'#ffe082':''
              }}>
              {board.get(k)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}