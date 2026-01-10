import { loadMatches } from '../shared/storage';

export default function Stats(){
  const m=loadMatches();
  const s:Record<string,{w:number,l:number}>={};
  m.forEach(x=>{
    s[x.playerX]??={w:0,l:0};
    s[x.playerO]??={w:0,l:0};
    s[x.winner==='X'?x.playerX:x.playerO].w++;
    s[x.winner==='X'?x.playerO:x.playerX].l++;
  });

  return (
    <div style={{padding:40}}>
      <h2>Stats</h2>
      {Object.entries(s).map(([k,v])=>(
        <div key={k}>{k}: {v.w}W / {v.l}L</div>
      ))}
    </div>
  );
}