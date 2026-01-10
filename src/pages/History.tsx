import { loadMatches } from '../shared/storage';

export default function History(){
  const m=loadMatches();
  return (
    <div style={{padding:40}}>
      <h2>History</h2>
      {m.map(x=>(
        <div key={x.id}>
          {x.playerX} vs {x.playerO} — winner {x.winner}
        </div>
      ))}
    </div>
  );
}