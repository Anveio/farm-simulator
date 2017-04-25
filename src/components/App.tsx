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
  const createFarmGrid = () => {
    let row = [];
    let farmGrid = [];
    for(let i = 0; i < props.farmRows; i++){
      row.push(
        <li><Tile key={i} onMouseOver={console.log("hello")}/></li>
      )
    }

    for(let j = 0; j < props.farmColumns; j++){
      farmGrid.push(
        <ul key={j} className="farm-column">{row}</ul>
      )
    }

    return farmGrid;
  }


  return (
    <ul className="tile-container">
      {createFarmGrid()}
    </ul>
  )
}


interface TileState { mouseHover: boolean; mouseDown: boolean }
class Tile extends React.Component<any, TileState> {
  constructor(props: any){
    super(props)
    this.state = {
      mouseHover: false,
      mouseDown: false
    }
  }

  handleMouseHover = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.preventDefault();
    console.log("Hovering");
    this.setState( {
      mouseHover: true
    })
  }

  render() {
    return(
      <div className="tile" onMouseOver={this.handleMouseHover}></div>
    )
  }
}
