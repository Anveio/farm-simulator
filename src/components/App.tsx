import * as React from "react";

export default class App extends React.Component<any, any>{
  render() {
    return(
      <div>
        <Game />
      </div>
    )  
  }
}

const Game = () => {
  return(
    <div className="container">
      <Farm farmRows={5} farmColumns={3} />
    </div>
  )
}

interface FarmProps { farmColumns: number; farmRows: number; }
const Farm = (props: FarmProps) => {
  let row = [];
  let farmGrid = []
  for(let i = 0; i < props.farmRows; i++){
    row.push(
      <li><Tile key={i}/></li>
    )
  }

  for(let j = 0; j < props.farmColumns; j++){
    farmGrid.push(
      <div key={j}>{row}</div>
    )
  }


  return (
    <ul className="tile-container">
      {farmGrid}
    </ul>
  )
}

const Tile = () => {
  return(
    <div className="tile"></div>
  )
}
