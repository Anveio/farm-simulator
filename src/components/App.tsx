import * as React from "react";

export default class App extends React.Component<any, any> {
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
      <div className="farm">
        <Farm farmRows={5} farmColumns={5} />
      </div>
      <MoneyCounter />
    </div>
  )
}

// interface MoneyCounterProps { updatedMoneyCount: number }
interface MoneyCounterState { currentMoneyCount: number }
class MoneyCounter extends React.Component<any, MoneyCounterState> {
  constructor(props:number){
    super(props)
    this.state = {
      currentMoneyCount: 0
    };
  }  

  render() {
    return(
      <div className="money-display">
        <h3>{this.state.currentMoneyCount}</h3>
      </div>
    )
  }
}

interface FarmProps { farmColumns: number; farmRows: number; }
class Farm extends React.Component<FarmProps, any> {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      mouseHover: false,
      mouseDown: false
    }
  }

  createFarmGrid = ():JSX.Element[] => {
    let row = [];
    let farmGrid = [];

    for(let x = 0; x < this.props.farmColumns; x++) {
      for(let y = 0; y < this.props.farmRows; y++) {
        row.push(
          <li key={[x, y].toString()}><Tile
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}/>
          </li>
        )
      }

      farmGrid.push(
        <ul key={x} className="farm-column">{row}</ul>
      )

      row = [];
    }

    return farmGrid;
  }

  handleMouseOver = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.preventDefault();
    console.log(e.target)
    this.setState({
      mouseHover: true
    })
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.preventDefault();
    this.setState({
      mouseDown: false
    })
  }

  farmGrid = this.createFarmGrid();

  render() {
    return (
      <div className="tile-container" onMouseDown={this.handleMouseDown}>
        {this.farmGrid}
      </div>
    )
  }
}


// interface TileState { mouseHover: boolean; mouseDown:boolean }
class Tile extends React.Component<any, undefined> {
  constructor(props: any){
    super(props)
  }

  render() {
    return(
      <div className="tile"></div>
    )
  }
}
