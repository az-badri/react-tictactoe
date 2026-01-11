const DIRS = [
  [1,0],
  [0,1],
  [1,1],
  [1,-1]
];

export const checkWinner = (board: Map<string,'X'|'O'>, x:number, y:number, p:'X'|'O') => {
  for (const [dx, dy] of DIRS) {
    let line = [`${x}:${y}`];
    for (const dir of [-1, 1]) {
      let s = 1;
      while(true) {
        const k = `${x + dx*s*dir}:${y + dy*s*dir}`;
        if (board.get(k) === p) {
          line.push(k);
          s++;
        }
        else break;
      }
    }
    if (line.length >= 5) return line;
  }
  return null;
}