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
    <div>
      <Farm farmRows={1} farmColumns={1} />
    </div>
  )
}

interface FarmProps { farmColumns: number; farmRows: number; }
const Farm = (props: FarmProps) => {
  let rows = [];
    for(let i=0; i < props.farmRows; i++){
      for(let j=0; j < props.farmColumns; j++){
        rows.push(
          <li><Tile key={[i,j].toString()}/></li>
        )
      }
    }

  return (
    <ul className="tile-container">
      {rows}
    </ul>
  )
}

const Tile = () => {
  return(
    <div className="tile"></div>
  )
}
