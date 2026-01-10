import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { checkWinner } from '../shared/checkWinner';
import { saveMatch } from '../shared/storage';

const VIEW=15;

export default function Game(){
  const {state}=useLocation() as any;
  const [board,setBoard]=useState(new Map<string,'X'|'O'>());
  const [turn,setTurn]=useState<'X'|'O'>('X');
  const [offset,setOffset]=useState({x:0,y:0});
  const [win,setWin]=useState<string[]|null>(null);
  const drag=useRef<{x:number,y:number}|null>(null);

  const click=(x:number,y:number)=>{
    if(win) return;
    const k=`${x}:${y}`;
    if(board.has(k)) return;
    const b=new Map(board); b.set(k,turn);
    const res=checkWinner(b,x,y,turn);
    if(res){
      setWin(res);
      saveMatch({
        id:Date.now().toString(),
        date:new Date().toISOString(),
        playerX:state.x,
        playerO:state.o,
        winner:turn,
        board:Object.fromEntries(b)
      });
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
          setOffset(o=>({
            x:o.x-Math.sign(e.clientX-drag.current!.x),
            y:o.y-Math.sign(e.clientY-drag.current!.y)
          }));
          drag.current={x:e.clientX,y:e.clientY};
        }
      }}
    >
      <Typography>{state.x} (X) vs {state.o} (O)</Typography>
      <Typography>{win?`Winner: ${turn}`:`Turn: ${turn}`}</Typography>

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